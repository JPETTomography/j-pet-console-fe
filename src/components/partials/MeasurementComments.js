import { useState, useRef } from "react";
import api from "../../api";
import Comment from "./Comment";

const MeasurementComments = ({ measurement, setMeasurement }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const inputRef = useRef(null);

  const onAddOrEditComment = async () => {
    if (newComment.trim() === "") return;

    setLoading(true);

    try {
      if (editingCommentId) {
        const response = await api.patch(
          `/measurements/${measurement.id}/comments/${editingCommentId}`,
          { content: newComment }
        );
        const updatedComment = response.data.comment;

        setMeasurement((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === editingCommentId ? updatedComment : c
          ),
        }));
        setEditingCommentId(null);
      } else {
        const response = await api.post(
          `/measurements/${measurement.id}/comments`,
          { comment_text: newComment }
        );
        const addedComment = response.data.comment;

        setMeasurement((prev) => ({
          ...prev,
          comments: [...prev.comments, addedComment],
        }));
      }

      setNewComment("");
    } catch (error) {
      console.error("Error adding/editing comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const onEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setNewComment(comment.content);

    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const inputElement = inputRef.current.querySelector("input");
      if (inputElement) inputElement.focus();
    }
  };

  const onDeleteComment = async (comment) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await api.delete(`/measurements/${measurement.id}/comments/${comment.id}`);

      setMeasurement((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== comment.id),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const onCancelEdit = () => {
    setEditingCommentId(null);
    setNewComment("");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Comments for{" "}
        <strong className="text-sky-700">{measurement.name}</strong>
      </h3>

      {measurement.comments && measurement.comments.length > 0 ? (
        <ul className="space-y-4">
          {measurement.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
            />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 italic">
          No comments available for this measurement.
        </p>
      )}

      <div ref={inputRef} className="mt-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder={editingCommentId ? "Edit your comment..." : "Add a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-3 rounded border border-slate-300 focus:border-sky-700 focus:ring focus:ring-sky-700 focus:ring-opacity-50 text-slate-800 transition-colors duration-300"
            disabled={loading}
          />
          {editingCommentId && (
            <button
              onClick={onCancelEdit}
              className="p-3 rounded bg-red-500 hover:bg-red-700 text-white font-medium"
              disabled={loading}
              type="button"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onAddOrEditComment}
            className={`p-3 rounded bg-sky-700 hover:bg-sky-900 focus:outline-sky-700 focus:outline-offset-4 text-white font-medium ${
              newComment.trim() === "" || loading
                ? "bg-slate-400 cursor-not-allowed"
                : ""
            }`}
            disabled={newComment.trim() === "" || loading}
          >
            {loading ? (editingCommentId ? "Saving..." : "Adding...") : (editingCommentId ? "Save" : "Add Comment")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementComments;
