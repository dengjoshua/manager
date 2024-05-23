import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { BASE_URL } from "../../services/api";
import axios from "axios";

const cookies = new Cookies();

import Task from "./Task";
const Tasks = ({ project, setSelectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setOpenModal] = useState(false);

  const closeModal = () => {
    setDescription("");
    setTitle("");
    setOpenModal(false);
  };

  const handleDeleteTask = async (task_id) => {
    const cookie = cookies.get("auth_token");

    await axios
      .delete(`${BASE_URL}/delete_task/${task_id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => {
        localStorage.setItem("currentProject", JSON.stringify(res.data));
        localStorage.removeItem("currentTask");
        setSelectedTask("");
      });
  };

  const handleEditTask = async (task_id) => {
    const cookie = cookies.get("auth_token");

    await axios
      .put(`${BASE_URL}/delete_task/${task_id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => {
        localStorage.setItem("currentProject", JSON.stringify(res.data));
        localStorage.removeItem("currentTask");
        setSelectedTask("");
        window.location = "/task_list";
      });
  };

  return (
    <React.Fragment>
      {!project ? (
        <div className="flex items-center w-full justify-center h-screen">
          <span className="ml-2">
            You currently haven't selected a project. Select one to view the
            tasks in detail.
          </span>
        </div>
      ) : (
        <section className="bg-gray-100 w-full h-max bg-cover bg-center">
          <div className="w-full h-full mx-auto p-5 lg:px-0 ">
            <h1 className="text-xl md:text-3xl pt-8 pb-5 font-sans">
              {project.name}
            </h1>
            <p className="text-base font-light md:text-lg mb-10">
              You currently have tasks in {project.name}.
            </p>
            <div>
              <ul className="w-full">
                {project.tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    editTask={() => console.log("works2")}
                    deleteTask={handleDeleteTask}
                    projectId={project.id}
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
