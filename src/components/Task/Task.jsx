import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";

export const Task = ({ id, title, editTask, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleEdit = () => {
    if (newTitle.trim()) {
      editTask(id, newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="task">
      <span {...listeners} {...attributes} className="drag-handle">
        ☰
      </span>
      {isEditing ? (
        <input
          className="task-input"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
        />
      ) : (
        <span className="task-title">{title}</span>
      )}
      <button onClick={() => setIsEditing(true)} className="edit-button">
        ✏️ Edit
      </button>
      <button onClick={() => deleteTask(id)} className="delete-button">
        ❌
      </button>
    </div>
  );
};
