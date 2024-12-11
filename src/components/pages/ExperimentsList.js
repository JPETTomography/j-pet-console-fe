import { useState, useEffect } from "react";

import ExperimentCard from "../partials/ExperimentCard";

import Page from "../partials/Page";
import PaginatedItems from "../partials/PaginatedItems";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const ExperimentsList = () => {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SOURCE}/experiments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch experiments");
      }
      const data = await response.json();
      setExperiments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  return (
    <Page>
      <h1>Experiments List</h1>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchExperiments} />
      ) : (
        <PaginatedItems items={experiments} ItemComponent={ExperimentCard} />
      )}
    </Page>
  );
};

export default ExperimentsList;
