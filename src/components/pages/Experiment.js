import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";

// eslint-disable-next-line
import Chart from "chart.js/auto"; // must have, although not used
import { Line } from "react-chartjs-2";
import Svg from "../partials/Svg";

import data from "../../data/bar_line.json";
import Badge from "../partials/Badge";

import Page from "../partials/Page";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const Experiment = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const { experiment_id } = useParams();

  const [experiment, setExperiment] = useState({});
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

  const fetchExperiment = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      await verifyToken(token);
      const response = await fetch(
        `${process.env.REACT_APP_API_SOURCE}/experiments/${experiment_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch experiment");
      }
      const data = await response.json();
      setExperiment(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [verifyToken, experiment_id]);

  useEffect(() => {
    fetchExperiment();
  }, [fetchExperiment, experiment_id]);

  return (
    <Page currentUser={currentUser}>
      <a
        href="/experiments"
        className="flex items-center gap-2 max-w-max font-semibold	text-sky-700 hover:text-sky-900 hover:underline transition-colors duration-300"
      >
        <Svg src="/icons/arrow-left.svg" className="w-5 h-5" />
        <span>Back to experiments list</span>
      </a>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchExperiment} />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <h1>{experiment.name}</h1>
              <div className="flex gap-4">
                <Badge status={experiment.status} />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <p className="text-xl">{experiment.description}</p>
              <div className="shrink-0 flex items-center gap-2 mb-auto text-sm">
                <Svg src="/icons/calendar-days.svg" className="w-6 h-6" />
                <span>
                  {formatDate(experiment.start_date)} -{" "}
                  {experiment.end_date
                    ? formatDate(experiment.end_date)
                    : "..."}
                </span>
              </div>
            </div>
            <div className="grid grid-rows-1 grid-flow-col gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Svg src="/icons/map-pin.svg" className="w-6 h-6" />
                {experiment.location}
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex justify-center h-80">
              <Line
                data={{
                  labels: data.x,
                  datasets: [
                    {
                      type: "bar",
                      label: "Measurement",
                      data: data.y,
                    },
                    {
                      label: "Reference",
                      data: data.y,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

export default Experiment;
