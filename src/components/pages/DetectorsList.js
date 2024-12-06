import { useState, useEffect } from "react";

import DetectorCard from "../partials/DetectorCard";

const DetectorsList = () => {
  const [detectors, setDetectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetectors = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/detectors`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch detectors");
        }
        const data = await response.json();
        setDetectors(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetectors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <h1>Detectors List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-none grid gap-4">
          {detectors.map((detector, index) => {
            return (
              <li key={index}>
                <DetectorCard {...detector} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DetectorsList;
