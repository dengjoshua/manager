import React from "react";
import { MdDelete } from "react-icons/md";

function Task({ task, editTask, deleteTask, projectId }) {
  return (
    <li
      className={`flex p-3 rounded-lg flex flex-col items-start mb-4 p- ${
        task.finished ? "bg-gray-300" : `${task.tag.color}`
      }`}
    >
      <div className="flex justify-between w-full content-center">
        <input
          type="checkbox"
          className="accent-orange-400 mt-1 border-none mx-2"
        />
        <MdDelete onClick={() => deleteTask(task.task_id, projectId)} />
      </div>
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
