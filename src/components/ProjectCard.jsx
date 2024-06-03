import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL } from "@/services/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ProjectCard({ project, handleProjectSelect }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return format(new Date(date), "PPP");
  };

  const handleClick = (id) => {
    handleProjectSelect(id);
    navigate(`/project_overview/${id}`);
  };

  const deleteProject = async () => {
    try {
      const cookie = cookies.get("auth_token");
      const response = await axios.delete(
        `${BASE_URL}/delete_project/${project.id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="card bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-gray-800">{project.name}</h3>
        <span
          className="text-sm text-red-500 cursor-pointer hover:underline"
          onClick={deleteProject}
        >
          Delete
        </span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-gray-600">
          <span>Priority: {project.priority}</span>
          <span className="ml-4">
            Status: {project.finish ? "Completed" : "In Progress"}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <span>Started: {formatDate(project.date_start)}</span>
          <span className="ml-4">Ends: {formatDate(project.date_end)}</span>
        </div>
      </div>
      <Button
        className="mt-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded"
        onClick={() => handleClick(project.id)}
      >
        View Details
      </Button>
    </div>
  );
}

export default ProjectCard;
