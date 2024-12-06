import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Svg from "../partials/Svg";

const Radioisotope = () => {
  const { radioisotope_id } = useParams();

  const [radioisotope, setRadioisotope] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadioisotope = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/radioisotopes/${radioisotope_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch radioisotope");
        }
        const data = await response.json();
        setRadioisotope(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRadioisotope();
  }, [radioisotope_id]);

  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <a
        href="/radioisotopes"
        className="flex items-center gap-2 max-w-max font-semibold	text-sky-700 hover:text-sky-900 hover:underline transition-colors duration-300"
      >
        <Svg src="/icons/arrow-left.svg" className="w-5 h-5" />
        <span>Back to radioisotopes list</span>
      </a>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <h1>{radioisotope.name}</h1>
            </div>
            <div className="flex justify-between gap-4">
              <p className="text-xl">{radioisotope.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Svg src="/icons/bolt.svg" className="w-6 h-6" />
                {radioisotope.activity}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Svg src="/icons/clock.svg" className="w-6 h-6" />
                {radioisotope.halftime}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Radioisotope;
