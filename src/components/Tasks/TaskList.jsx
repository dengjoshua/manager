import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { SelectForm } from "../common/SelectForm";
import TaskDetail from "./TaskDetail";

function TaskList({ projects }) {
  const [selectedProject, setSelectedProject] = useState("");
  const [currentTask, setSelectedTask] = useState("");

  useEffect(() => {
    const currentProject = JSON.parse(localStorage.getItem("currentProject"));
    const currentTask = JSON.parse(localStorage.getItem("currentTask"));

    if (currentProject) {
      setSelectedProject(currentProject);
    }
    if (currentTask) {
      setSelectedTask(currentTask);
    }
  }, [selectedProject, projects, currentTask]);

  const handleProjectChange = (option) => {
    const project = projects.find((project) => project.name === option);
    setSelectedProject(project);
    localStorage.setItem("currentProject", JSON.stringify(project));
    localStorage.removeItem("currentTask");
    setSelectedTask("");
  };

  return (
    <React.Fragment>
      {projects.length === 0 ? (
        <div className="flex w-full h-screen">
          <p className="m-auto">Loading...</p>
        </div>
      ) : (
        <div className="flex bg-gray-100 w-full">
          <div className="flex flex-col border-r border-gray-200 p-4 w-3/5">
            <div className="p-3">
              <SelectForm
                label="Projects"
                handleSelectOption={handleProjectChange}
                options={projects}
              />
            </div>
            <div className="flex flex-row">
              <Tasks
                project={selectedProject}
                setSelectedTask={setSelectedTask}
              />
            </div>
          </div>
          <TaskDetail currentTask={currentTask} />
        </div>
      )}
    </React.Fragment>
  );
}

export default TaskList;
