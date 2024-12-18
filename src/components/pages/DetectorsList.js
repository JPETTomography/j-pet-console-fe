import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import DetectorCard from "../partials/DetectorCard";

import Page from "../partials/Page";
import PaginatedItems from "../partials/PaginatedItems";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const DetectorsList = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [detectors, setDetectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const verifyToken = useCallback(
    async (token) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/verify-token/${token}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Token verifiation failed");
        }
        const data = await response.json();
        setCurrentUser(data.payload.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    },
    [navigate]
  );

  const fetchDetectors = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      await verifyToken(token);
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
  }, [verifyToken]);

  useEffect(() => {
    fetchDetectors();
  }, [fetchDetectors]);

  return (
    <Page currentUser={currentUser}>
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
