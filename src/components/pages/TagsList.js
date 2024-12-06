import { useState, useEffect } from "react";

import TagCard from "../partials/TagCard";

const TagsList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/tags`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTags(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <h1>Tags List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-none grid gap-4">
          {tags.map((tag, index) => {
            return (
              <li key={index}>
                <TagCard {...tag} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TagsList;
