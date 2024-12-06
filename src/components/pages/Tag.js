import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Svg from "../partials/Svg";

import Badge from "../partials/Badge";

const Experiment = () => {
  const { tag_id } = useParams();

  const [tag, setExperiment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/tags/${tag_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tag");
        }
        const data = await response.json();
        setExperiment(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTag();
  }, [tag_id]);

  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <a
        href="/tags"
        className="flex items-center gap-2 max-w-max font-semibold	text-sky-700 hover:text-sky-900 hover:underline transition-colors duration-300"
      >
        <Svg src="/icons/arrow-left.svg" className="w-5 h-5" />
        <span>Back to tags list</span>
      </a>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <h1>{tag.name}</h1>
              <div className="flex gap-4">
                <Badge status={tag.name} />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <p className="text-xl">{tag.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Experiment;
