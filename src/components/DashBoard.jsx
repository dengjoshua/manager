import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { format } from "date-fns";
import { BASE_URL } from "../services/api";
import { FaPlusCircle } from "react-icons/fa";

import Cookies from "universal-cookie";
import axios from "axios";
import { ProjectForm } from "./createProject";
import ProjectCard from "./ProjectCard";
import LoadingDots from "./common/LoadingDots";

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
  const [isCreating, setIsCreating] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectSelect = (id) => {
    localStorage.setItem("currentProjectId", id);
  };

  const handleCreateProject = async () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

    const cookie = cookies.get("auth_token");

    try {
      setIsCreating(true);
      setIsModalOpen(false);

      const response = await axios.post(
        `${BASE_URL}/create_project/ai`,
        {
          name: projectName,
          description,
          date_start: formattedStartDate,
          date_end: formattedEndDate,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      setProjects(response.data);
      setProjectName("");
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setPriority("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const fetchAllProjects = async () => {
    const cookie = cookies.get("auth_token");

    try {
      const response = await axios.get(`${BASE_URL}/get_projects`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
    setIsLoading(false);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Projects Dashboard</h1>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div>
          <p className="mb-4">
            {projects.length === 0
              ? "You currently have no ongoing projects."
              : `You currently have ${projects.length} ongoing projects.`}
          </p>
          <div
            className="bg-white h-40 m-2 w-32 p-4 hover:pointer justify-center flex flex-col items-center border-2 border-dashed border-orange-400 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle size={36} color="orange" />
            <p className="mt-2 text-center text-orange-600 font-semibold">
              Create Project
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
            {projects &&
              projects.map((project, index) => (
                <ProjectCard
                  project={project}
                  key={index}
                  handleProjectSelect={handleProjectSelect}
                />
              ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="rounded-lg p-6 w-full max-w-md">
            <ProjectForm
              setDescription={setDescription}
              setEndDate={setEndDate}
              setPriority={setPriority}
              setProjectName={setProjectName}
              name={projectName}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              priority={priority}
              handleCreateProject={handleCreateProject}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}

      {isCreating && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <LoadingDots />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
