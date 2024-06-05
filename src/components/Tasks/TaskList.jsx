import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { SelectForm } from "../common/SelectForm";
import TaskDetail from "./TaskDetail";
import LoadingDots from "../common/LoadingDots";

function TaskList({ projects, fetchAllProjects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState();
  const [finished, setFinished] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const currentProject = JSON.parse(localStorage.getItem("currentProject"));

    if (currentProject) {
      setSelectedProject(currentProject);
    } else if (projects.length > 0) {
      setSelectedProject(projects[0]);
      localStorage.setItem("currentProject", JSON.stringify(projects[0]));
    }
  }, [projects]);

  const handleProjectChange = (option) => {
    const project = projects.find((project) => project.name === option);
    setSelectedProject(project);
    localStorage.setItem("currentProject", JSON.stringify(project));
    setSelectedTask(null);
  };

  const handleSelectTask = (task) => {
    setDate(task.date);
    setDescription(task.description);
    setName(task.name);
    setFinished(task.finished);
    setSelectedTask(task);
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
                value={selectedProject ? selectedProject.name : ""}
              />
            </div>
            <div className="flex flex-row">
              <Tasks
                project={selectedProject}
                setSelectedTask={handleSelectTask}
              />
            </div>
          </div>
          <TaskDetail
            selectedTask={selectedTask}
            date={date}
            name={name}
            description={description}
            finished={finished}
            setDate={setDate}
            setDescription={setDescription}
            setFinished={setFinished}
            setName={setName}
            setIsCreating={setIsCreating}
            fetchAllProjects={fetchAllProjects}
          />
          {isCreating && (
            <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
              <LoadingDots />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default TaskList;
