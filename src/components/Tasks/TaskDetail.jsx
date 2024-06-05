import React, { useState, useEffect, useRef } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import { BASE_URL } from "@/services/api";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

function TaskDetail({
  selectedTask,
  name,
  description,
  date,
  setName,
  setDescription,
  setDate,
  finished,
  setFinished,
  setIsCreating,
  fetchAllProjects,
}) {
  const formatDate = (date) => {
    const newDate = new Date(date);
    return format(newDate, "yyyy-MM-dd");
  };

  const saveTask = async () => {
    const formattedDate = new Date(date).toISOString();
    try {
      setIsCreating(true);
      const response = await axios.put(
        `${BASE_URL}/edit_task/${selectedTask.id}`,
        { name, description, finished, date: formattedDate },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchAllProjects();
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task");
    } finally {
      setIsCreating(false);
    }
  };

  return !selectedTask ? (
    <div className="w-2/5 bg-gray-100 p-6 h-screen overflow-y-auto flex justify-center items-center">
      <p className="text-gray-500 text-center mt-10">
        Select a task to view it in detail.
      </p>
    </div>
  ) : (
    <div className="w-2/5 bg-gray-100 p-6 h-screen overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <Checkbox
            className="form-checkbox h-5 w-5 text-green-500 hover:text-green-600 transition-colors"
            name="finished"
            checked={finished || false}
            onChange={() => setFinished(!finished)}
          />
          <div className="flex space-x-2">
            <MdEdit
              className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
              size={24}
              onClick={saveTask}
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
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-100 p-2 text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="description"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-100 p-2 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          rows="3"
        />
        <div className="flex items-center space-x-4 text-gray-500">
          <span className="font-medium">Due Date:</span>
          <input
            type="date"
            name="dueDate"
            value={date ? formatDate(date) : formatDate(new Date())}
            onChange={(e) => setDate(e.target.value)}
            className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <span className="font-medium">Assignee:</span>
          <input
            type="text"
            name="assignee"
            value={selectedTask.assignee?.name || ""}
            onChange={(e) => handleInputChange(e)}
            className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {selectedTask.tag && (
          <div className="mt-2">
            <p className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">
              {selectedTask.tag.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;
