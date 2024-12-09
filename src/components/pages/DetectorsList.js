import { useState, useEffect } from "react";

import DetectorCard from "../partials/DetectorCard";

import Page from "../partials/Page";
import PaginatedItems from "../partials/PaginatedItems";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const DetectorsList = () => {
  const [detectors, setDetectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetectors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SOURCE}/detectors`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch detectors");
      }
      const data = await response.json();
      setDetectors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetectors();
  }, []);

  return (
    <Page>
      <h1>Detectors List</h1>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchDetectors} />
      ) : (
        <PaginatedItems items={detectors} ItemComponent={DetectorCard} />
      )}
    </Page>
  );
};

export default DetectorsList;
