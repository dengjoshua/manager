import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { format } from "date-fns";
import { BASE_URL } from "../services/api";
import { Link } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setProjectId } = useProject();

  const handleProjectSelect = (id) => {
    localStorage.setItem("currentProjectId", id);
  };

  const handleCreateProject = async () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

    const cookie = cookies.get("auth_token");

    setIsModalOpen(false);

    await axios
      .post(
        `${BASE_URL}/create_project`,
        {
          name: projectName,
          description,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setProjectName("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setPriority("");
  };

  const fetchAllProjects = async () => {
    const cookie = cookies.get("auth_token");

    await axios
      .get(`${BASE_URL}/get_projects`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllProjects();
    setIsLoading(false);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects Dashboard</h1>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.project_id}
              className="card bg-white p-4 rounded shadow"
            >
              <h3 className="text-xl font-bold">{project.name}</h3>
              <Link
                to={`/project_overview/${project.project_id}`}
                className="text-blue-500 hover:text-blue-600"
                onClick={() => handleProjectSelect(project.project_id)}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <label className="block mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex space-x-4 mb-3">
              <div>
                <label className="block mb-1">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <label className="block mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full mb-5 p-2 border rounded bg-white"
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={handleCreateProject}
              className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-2 px-4 ml-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
