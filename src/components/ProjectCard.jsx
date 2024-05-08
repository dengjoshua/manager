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
      <h3 className="text-xl font-bold">{project.name}</h3>
      <p>Priority: {project.priority}</p>
      <p>Completed: {project.finish ? "Yes" : "No"}</p>
      <p>Started: {formatDate(project.date_start)}</p>
      <p>Ends: {formatDate(project.date_end)}</p>
      <Button>
        {" "}
        <Link
          to={`/project_overview/${project.project_id}`}
          className="text-blue-500 hover:text-blue-600"
          onClick={() => handleProjectSelect(project.project_id)}
        >
          View Details
        </Link>
      </Button>
    </div>
  );
}

export default ProjectCard;
