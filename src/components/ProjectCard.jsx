import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { format } from "date-fns";

function ProjectCard({ project, handleProjectSelect }) {
  const formatDate = (date) => {
    return format(date, "PPP");
  };

  return (
    <div className="card bg-white p-4 rounded shadow">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <span>Priority: {project.priority}</span>
        <span>Completed: {project.finish ? "Yes" : "No"}</span>
        <span>Started: {formatDate(project.date_start)}</span>
        <span>Ends: {formatDate(project.date_end)}</span>
      </div>

      <Button className="bg-orange-400 hover:bg-orange-300">
        <Link
          to={`/project_overview/${project.project_id}`}
          className="text-white hover:bg-orange-300"
          onClick={() => handleProjectSelect(project.project_id)}
        >
          View Details
        </Link>
      </Button>
    </div>
  );
}

export default ProjectCard;
