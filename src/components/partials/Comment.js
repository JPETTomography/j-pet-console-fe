import React, { useState } from "react";
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Comment = ({ comment, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const initials = comment.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} • ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <li className="flex gap-3 p-4 bg-white rounded shadow-sm border border-slate-200 relative group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
        {initials}
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <strong className="text-slate-800 font-semibold">{comment.user.name}</strong>
          <span className="text-xs text-slate-500">{formatDate(comment.created_at)}</span>
        </div>
        <div className="text-slate-700 text-sm mt-1 markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.content}</ReactMarkdown>
        </div>
      </div>
      {currentUser?.id === comment.user.id && (
        <div className="absolute top-4 right-4">
          <FiMoreHorizontal
            className="text-slate-500 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute top-6 right-0 bg-white border border-slate-300 rounded shadow-md z-10">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full" onClick={() => onEdit(comment)}>
                <FiEdit2 />Edit
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-slate-100 w-full" onClick={() => onDelete(comment)}>
                <FiTrash2 />Delete
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default Comment;