import { useDraggable } from "@dnd-kit/core";
import React from "react";

const TodoBar = ({
  id,
  text,
  onDelete,
  onUpdate,
  group,
  onCheck,
  setActiveCard,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.toString(), // Make each task draggable
  });

  return (
    <div
      ref={setNodeRef} // Corrected: use 'ref' instead of 'cref'
      className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto my-2"
      {...listeners} // Required for drag events
      {...attributes} // Required for draggable attributes
    >
      {/* Checkbox and Task */}
      <div className="flex items-center">
        <input
          type="checkbox"
          onClick={() => onCheck(id, group.id)}
          className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400 focus:ring-2"
        />
        <span className="ml-3 text-lg text-gray-800 mx-4">{text}</span>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onUpdate(id, group.id)}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(id, group.id)}
          className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoBar;
