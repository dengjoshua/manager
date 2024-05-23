import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { format } from "date-fns";

function ProjectCard({ project, handleProjectSelect }) {
  const formatDate = (date) => {
    return format(date, "PPP");
  };
  const navigate = useNavigate();

  const handleClick = (id) => {
    const loc = `/project_overview/${id}`;
    handleProjectSelect(id);
    navigate(loc);
  };

  return (
    <div className="card bg-white p-4 rounded shadow">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <span>Priority: {project.priority}</span>
        <span>Status: {project.finish ? "Completed" : "Inprogress"}</span>
        <span>Started: {formatDate(project.date_start)}</span>
        <span>Ends: {formatDate(project.date_end)}</span>
      </div>

      <Button
        className="bg-orange-400 hover:bg-orange-300 text-white"
        onClick={() => handleClick(project.id)}
      >
        View Details
      </Button>
    </div>
  );
}

export default ProjectCard;
