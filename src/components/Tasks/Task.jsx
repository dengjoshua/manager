import React from "react";
import { MdDelete } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";

function Task({ task, editTask, deleteTask, projectId }) {
  const setCurrentTask = () => {
    return localStorage.setItem("currentTask", JSON.stringify(task));
  };

  return (
    <li
      className="flex p-3 rounded-lg flex flex-col items-start mb-4 border-b-2 "
      onClick={() => setCurrentTask()}
    >
      <div className="flex justify-between w-full content-center">
        <Checkbox className="accent-green-400" />
        <MdDelete onClick={() => deleteTask(task.task_id, projectId)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="text-title overflow-auto">{task.name}</span>
          <p className="text-gray-500 mb-1">{task.description}</p>
        </div>
      </div>
    </li>
  );
}

export default Task;
