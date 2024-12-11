import { useState, useEffect } from "react";

import RadioisotopeCard from "../partials/RadioisotopeCard";

import Page from "../partials/Page";
import PaginatedItems from "../partials/PaginatedItems";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const RadioisotopesList = () => {
  const [radioisotopes, setRadioisotopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRadioisotopes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SOURCE}/radioisotopes`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch radioisotopes");
      }
      const data = await response.json();
      setRadioisotopes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadioisotopes();
  }, []);

  return (
    <Page>
      <h1>Radioisotopes List</h1>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchRadioisotopes} />
      ) : (
        <PaginatedItems
          items={radioisotopes}
          ItemComponent={RadioisotopeCard}
        />
      )}
    </Page>
  );
};

export default RadioisotopesList;
