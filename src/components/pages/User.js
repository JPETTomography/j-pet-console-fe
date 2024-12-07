import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Svg from "../partials/Svg";

import Badge from "../partials/Badge";

const Experiment = () => {
  const { user_id } = useParams();

  const [user, setExperiment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/users/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
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

    fetchUser();
  }, [user_id]);

  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <a
        href="/users"
        className="flex items-center gap-2 max-w-max font-semibold	text-sky-700 hover:text-sky-900 hover:underline transition-colors duration-300"
      >
        <Svg src="/icons/arrow-left.svg" className="w-5 h-5" />
        <span>Back to users list</span>
      </a>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <h1>{user.name}</h1>
              {user.role && (
                <div className="flex gap-4">
                  <Badge status={user.role} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Svg src="/icons/at-symbol.svg" className="w-6 h-6" />
                {user.email}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Experiment;
