import { useState } from "react";
import api from "../../api";

const MeasurementComments = ({ measurement, setMeasurement }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const onAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(
        `/measurements/${measurement.id}/comments`,
        {
          comment_text: newComment,
        }
      );

      const newCommentData = response.data.comment;

      setMeasurement((prevMeasurement) => ({
        ...prevMeasurement,
        comments: [...prevMeasurement.comments, newCommentData],
      }));

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Comments for{" "}
        <strong className="text-sky-700">{measurement.name}</strong>
      </h3>

      {measurement.comments && measurement.comments.length > 0 ? (
        <ul className="space-y-4">
          {measurement.comments.map((comment, index) => (
            <li
              key={index}
              className="p-4 border border-slate-300 rounded shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <strong className="text-sky-700">{comment.user.name}</strong>
                <span className="text-sm text-slate-500 italic">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-slate-800">{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 italic">
          No comments available for this measurement.
        </p>
      )}

      <div className="mt-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-3 rounded border border-slate-300 focus:border-sky-700 focus:ring focus:ring-sky-700 focus:ring-opacity-50 text-slate-800 transition-colors duration-300"
            disabled={loading}
          />
          <button
            onClick={onAddComment}
            className={`p-3 rounded bg-sky-700 hover:bg-sky-900 focus:outline-sky-700 focus:outline-offset-4 text-white font-medium ${
              newComment.trim() === "" || loading
                ? "bg-slate-400 cursor-not-allowed"
                : ""
            }`}
            disabled={newComment.trim() === "" || loading}
          >
            {loading ? "Adding..." : "Add Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementComments;
