import { useState, useEffect } from "react";

import RadioisotopeCard from "../partials/RadioisotopeCard";

import Page from "../partials/Page";

const RadioisotopesList = () => {
  const [radioisotopes, setRadioisotopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadioisotopes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/radioisotopes`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch radioisotopes");
        }
        const data = await response.json();
        setRadioisotopes(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRadioisotopes();
  }, []);

  return (
    <Page>
      <h1>Radioisotopes List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-none grid gap-4">
          {radioisotopes.map((radioisotope, index) => {
            return (
              <li key={index}>
                <RadioisotopeCard {...radioisotope} />
              </li>
            );
          })}
        </ul>
      )}
    </Page>
  );
};

export default RadioisotopesList;
