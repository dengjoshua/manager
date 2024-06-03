import React from "react";
import { MdDelete } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";

function Task({ task, editTask, deleteTask, projectId }) {
  const setCurrentTask = () => {
    return localStorage.setItem("currentTask", JSON.stringify(task));
  };

  const tag = task.tag;

  return (
    <li
      className="flex flex-col p-4 rounded-lg mb-4 border border-gray-200 bg-white shadow hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setCurrentTask()}
    >
      <div className="flex justify-between items-center mb-2">
        <Checkbox className="form-checkbox h-5 w-5 text-green-500 hover:text-green-600 transition-colors" />
        <MdDelete
          className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id, projectId);
          }}
          size={24}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-1 mb-2">
          <span className="text-lg font-semibold text-gray-800 overflow-auto">
            {task.name}
          </span>
          <p className="text-gray-600">{task.description}</p>
        </div>
        {tag && (
          <div className="mt-2">
            <p className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">
              {tag.name}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

export default Task;
