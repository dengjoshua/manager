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
      .then(() => {
        fetchAllProjects();
      })
      .catch((err) => console.log(err));

    setProjectName("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setPriority("");
    setIsModalOpen(false);
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
        <div>
          <p>
            {projects.length == 0
              ? "You current have no ongoing projects."
              : `You currently have ${projects.length} ongoing projects.`}
          </p>
          <div
            className="bg-white h-40 m-2 w-32 p-2 hover:pointer justify-center flex flex-col"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle size={24} color="orange" className="mx-auto" />
            <p className="mx-auto">Create Project</p>
          </div>
          <div className="flex gap-4 ">
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
          <div className="bg-white rounded ">
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
    </div>
  );
};

export default Dashboard;
