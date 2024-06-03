import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";

function TaskDetail({ currentTask }) {
  return (
    <div className="w-2/5 bg-gray-100 p-6 h-screen overflow-y-auto">
      {!currentTask ? (
        <p className="text-gray-500 text-center mt-10">
          Select a task to view it in detail.
        </p>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <Checkbox className="form-checkbox h-5 w-5 text-green-500 hover:text-green-600 transition-colors" />
            <div className="flex space-x-2">
              <MdEdit
                className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                size={24}
              />
              <MdDelete
                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                size={24}
              />
            </div>
          </div>
          <input
            type="text"
            name="name"
            value={currentTask.name}
            onChange={() => console.log("works")}
            className="w-full bg-gray-100 p-2 text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="description"
            value={currentTask.description}
            onChange={() => console.log("works")}
            className="w-full bg-gray-100 p-2 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            rows="3"
          />
          <div className="flex items-center space-x-4 text-gray-500">
            <span className="font-medium">Due Date:</span>
            <input
              type="date"
              name="dueDate"
              value={format(currentTask.date, "yyyy-MM-dd HH:mm")}
              onChange={() => console.log("works")}
              className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <span className="font-medium">Assignee:</span>
            <input
              type="text"
              name="assignee"
              value={currentTask.assignee.name}
              onChange={() => console.log("works")}
              className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {currentTask.tag && (
            <div className="mt-2">
              <p className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">
                {currentTask.tag.name}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskDetail;
