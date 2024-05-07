import React from "react";

function Task({ task, editTask, deleteTask }) {
  return (
    <li
      className={`flex p-3 rounded-lg items-start mb-4 p- ${
        task.finished ? "bg-gray-300" : `${task.tag.color}`
      }`}
    >
      <input
        type="checkbox"
        className="accent-orange-400 mt-1 border-none mx-2"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <span className="text-title overflow-auto">{task.name}</span>
        </div>

        <p className="text-general mb-1">{task.description}</p>
      </div>
    </li>
  );
}

export default Task;
