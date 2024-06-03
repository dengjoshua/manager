import React, { useState } from "react";
import { FaSearch, FaAngleDown } from "react-icons/fa";
import { format } from "date-fns";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../services/api";

const cookies = new Cookies();

function ProjectDetails({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    date: "",
    tag: { name: "", color: "" },
  });

  const formatDate = (date) => format(new Date(date), "PPP");

  const projectId = localStorage.getItem("currentProjectId");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e, field, isTag = false) => {
    if (isTag) {
      setNewTask((prev) => ({
        ...prev,
        tag: { ...prev.tag, [field]: e.target.value },
      }));
    } else {
      setNewTask((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const createTask = async () => {
    const cookie = cookies.get("auth_token");

    try {
      const response = await axios.post(
        `${BASE_URL}/create_task/${projectId}`,
        {
          name: newTask.name,
          date: newTask.date,
          description: newTask.description,
          tag_name: newTask.tag.name,
          tag_color: newTask.tag.color,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <table className="table-auto border-separate border-spacing-2 w-full">
            <tbody>
              <tr className="text-sm">
                <th className="text-left font-normal text-gray-500">
                  Priority
                </th>
                <td>
                  <span className="text-sm p-1 rounded-lg bg-stone-200 inline-block">
                    {project.priority}
                  </span>
                </td>
              </tr>
              <tr className="text-sm">
                <th className="text-left font-normal text-gray-500">
                  Date Due
                </th>
                <td>{formatDate(project.date_end)}</td>
              </tr>
              <tr className="text-sm">
                <th className="text-left font-normal text-gray-500">Tags</th>
                <td>
                  <div className="flex flex-wrap">
                    {project.tags.map((tag, index) => (
                      <div
                        key={index}
                        className={`border mr-2 mb-2 px-2 py-1 justify-center ${tag.color} rounded-lg border-gray-200`}
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center rounded-lg border-gray-300 border bg-white p-2">
          <input
            type="text"
            name="search"
            className="outline-none text-sm w-full"
            placeholder="Search for task..."
          />
          <FaSearch className="text-md text-gray-400 ml-2" />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center p-2 bg-orange-400 rounded-md text-white text-sm hover:bg-orange-500"
          onClick={openModal}
        >
          New Task <FaAngleDown className="ml-2" />
        </button>
        <ul className="flex space-x-2">
          {["Filter", "Sort", "Label", "Category"].map((item, index) => (
            <li
              key={index}
              className="flex items-center border justify-center bg-slate-100 text-xs rounded-lg border-gray-200 px-3 py-2 hover:bg-slate-200 cursor-pointer"
            >
              {item} <FaAngleDown className="ml-1 text-xs" />
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => handleInputChange(e, "name")}
              placeholder="Task Name"
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              value={newTask.description}
              onChange={(e) => handleInputChange(e, "description")}
              placeholder="Description"
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-between mb-3">
              <input
                type="date"
                value={newTask.date}
                onChange={(e) => handleInputChange(e, "date")}
                className="w-1/2 mr-2 p-2 border rounded"
              />
            </div>
            <div className="flex justify-between mb-3">
              <input
                type="text"
                value={newTask.tag.name}
                onChange={(e) => handleInputChange(e, "name", true)}
                placeholder="Tag Name"
                className="w-1/2 mr-2 p-2 border rounded"
              />
              <input
                type="text"
                value={newTask.tag.color}
                onChange={(e) => handleInputChange(e, "color", true)}
                placeholder="Tag Color (e.g., bg-green-200)"
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
