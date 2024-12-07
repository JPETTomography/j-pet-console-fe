import { useState, useEffect } from "react";

import ExperimentCard from "../partials/ExperimentCard";

import Page from "../partials/Page";

const ExperimentsList = () => {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/experiments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch experiments");
        }
        const data = await response.json();
        setExperiments(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiments();
  }, []);

  return (
    <Page>
      <h1>Experiments List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-none grid gap-4">
          {experiments.map((experiment, index) => {
            return (
              <li key={index}>
                <ExperimentCard {...experiment} />
              </li>
            );
          })}
        </ul>
      )}
    </Page>
  );
};

export default ExperimentsList;
