import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import { BASE_URL } from "@/services/api";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

function TaskDetail({ currentTask }) {
  const [task, setTask] = useState("");

  const formatDate = (date) => {
    const newDate = new Date(date);
    console.log(newDate);
    return format(newDate, "yyyy-mm-dd");
  };

  const setCurrentTask = () => {
    setTask(currentTask);
  };

  useEffect(() => {
    setCurrentTask();
    console.log(task);
  }, [currentTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const saveTask = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        alert("Task updated successfully!");
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task");
    }
  };

  const UpdateTodo = async () => {};

  return (
    <div className="w-2/5 bg-gray-100 p-6 h-screen overflow-y-auto">
      {!task ? (
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
            value={task.name}
            onChange={() => console.log("works")}
            className="w-full bg-gray-100 p-2 text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="description"
            value={task.description}
            onChange={() => console.log("works")}
            className="w-full bg-gray-100 p-2 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            rows="3"
          />
          <div className="flex items-center space-x-4 text-gray-500">
            <span className="font-medium">Due Date:</span>
            <input
              type="date"
              name="dueDate"
              value={formatDate(task.date)}
              onChange={() => console.log("works")}
              className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <span className="font-medium">Assignee:</span>
            <input
              type="text"
              name="assignee"
              value={task.assignee.name}
              onChange={() => console.log("works")}
              className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {task.tag && (
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
