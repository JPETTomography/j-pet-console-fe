import React, { useState, useEffect } from "react";
import api from "../../api";
import Comment from "./Comment";
import SimpleMDE from "react-simplemde-editor";
import { marked } from "marked";
import "easymde/dist/easymde.min.css";
const MeasurementComments = ({ measurement, setMeasurement }) => {
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editorValue, setEditorValue] = useState("");
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    if (editingCommentId) {
      const comment = measurement.comments.find(
        (c) => c.id === editingCommentId
      );
      if (comment) {
        console.log("Editing comment:", comment);
        setEditorValue(comment.content || "");
        setHasContent(Boolean((comment.content || "").trim() !== ""));
      }
    } else {
      setEditorValue("");
      setHasContent(false);
    }
  }, [editingCommentId, measurement.comments]);

  const onAddOrEditComment = async () => {
    if (!editorValue || editorValue.trim() === "") return;
    setLoading(true);
    try {
      const path = editingCommentId
        ? `/measurements/${measurement.id}/comments/${editingCommentId}`
        : `/measurements/${measurement.id}/comments`;
      const response = await api[editingCommentId ? "patch" : "post"](path, {
        content: editorValue,
      });
      const updatedComment = response.data.comment;
      setMeasurement((prev) => ({
        ...prev,
        comments: editingCommentId
          ? prev.comments.map((c) =>
              c.id === editingCommentId ? updatedComment : c
            )
          : [...prev.comments, updatedComment],
      }));
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error adding/editing comment:", error);
    } finally {
      setLoading(false);
      setEditorValue("");
      setHasContent(false);
    }
  };

  const onDeleteComment = async (commentId) => {
    if (
      !window.confirm("Are you sure you want to delete this comment?")
    )
      return;
    setLoading(true);
    try {
      await api.delete(
        `/measurements/${measurement.id}/comments/${commentId}`
      );
      setMeasurement((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== commentId),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const onCancelEdit = () => {
    setEditingCommentId(null);
    setEditorValue("");
    setHasContent(false);
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
              onEdit={() => setEditingCommentId(comment.id)}
              onDelete={() => onDeleteComment(comment.id)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 italic">
          No comments available for this measurement.
        </p>
      )}
      <div className="mt-6 markdown">
        <SimpleMDE
          value={editorValue}
          onChange={(value) => {
            setEditorValue(value);
            setHasContent(value.trim() !== "");
          }}
          options={{
            spellChecker: false,
            placeholder: editingCommentId
              ? "Edit your comment..."
              : "Add a comment...",
            status: false,
            autofocus: true,
            previewRender: (plainText) => marked(plainText, {
              gfm: true,
              breaks: true,
              smartLists: true,
              smartypants: true,
            }),
            toolbar: [
              "bold",
              "italic",
              "strikethrough",
              "heading",
              "|",
              "unordered-list",
              "ordered-list",
              "|",
              "link",
              "table",
              "|",
              "preview",
              "guide",
            ],
          }}
        />
        <div className="flex items-center gap-4 mt-4">
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
            className={`p-3 rounded bg-sky-700 hover:bg-sky-900 text-white font-medium ${
              loading || !hasContent
                ? "bg-slate-400 cursor-not-allowed"
                : ""
            }`}
            disabled={loading || !hasContent}
          >
            {loading
              ? editingCommentId
                ? "Saving..."
                : "Adding..."
              : editingCommentId
              ? "Save"
              : "Add Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementComments;
