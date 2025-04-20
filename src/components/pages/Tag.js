import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Svg from "../partials/Svg";

import Tag from "../partials/Tag";

import Page from "../partials/Page";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";
import api from "../../api";

const Experiment = () => {
  const navigate = useNavigate();

  const { tag_id } = useParams();

  const [tag, setTag] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTag = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/tags/${tag_id}`);
      setTag(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [tag_id, navigate]);

  useEffect(() => {
    fetchTag();
  }, [fetchTag, tag_id]);

  return (
    <Page>
      <a
        href="/tags"
        className="flex items-center gap-2 max-w-max font-semibold	text-sky-700 hover:text-sky-900 hover:underline transition-colors duration-300"
      >
        <Svg src="/icons/arrow-left.svg" className="w-5 h-5" />
        <span>Back to tags list</span>
      </a>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchTag} />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <h1>{tag.name}</h1>
              <div className="flex gap-4">
                <Tag name={tag.name} color={tag.color} />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <p className="text-xl">{tag.description}</p>
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

export default Experiment;
