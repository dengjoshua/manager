import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { BASE_URL } from "../services/api";
import axios from "axios";

const cookies = new Cookies();

import Task from "./Task";
const Tasks = ({ project }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setOpenModal] = useState(false);
  const tasks = project.tasks;

  const closeModal = () => {
    setDescription("");
    setTitle("");
    setOpenModal(false);
  };

  const handleDeleteTask = async (task_id, projectId) => {
    const cookie = cookies.get("auth_token");

    await axios
      .delete(`${BASE_URL}/delete_task/${projectId}/${task_id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => console.log(res.data));
  };

  return (
    <React.Fragment>
      {!project ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <span className="ml-2">Loading Tasks....</span>
        </div>
      ) : (
        <section className="bg-gray-100 w-full h-max bg-cover bg-center">
          <div className="w-full h-full mx-auto p-5 lg:px-0 ">
            <h1 className="text-xl md:text-3xl pt-8 pb-5 font-sans">
              {project.name}
            </h1>
            <p className="text-base font-light md:text-lg mb-10">
              You currently have {tasks.length} tasks in {project.name}.
            </p>
            <div>
              <ul className="w-full">
                {tasks.map((task) => (
                  <Task
                    key={task.task_id}
                    task={task}
                    editTask={() => console.log("works2")}
                    deleteTask={handleDeleteTask}
                    projectId={project.project_id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Tasks;
