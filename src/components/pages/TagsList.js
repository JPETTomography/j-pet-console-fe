import { useState, useEffect } from "react";

import TagCard from "../partials/TagCard";
import Page from "../partials/Page";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const TagsList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SOURCE}/tags`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      const data = await response.json();
      setTags(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Page>
      <h1>Tags List</h1>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchTags} />
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
    </Page>
  );
};

export default TagsList;
