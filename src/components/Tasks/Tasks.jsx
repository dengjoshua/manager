import React, { useState } from "react";
import Cookies from "universal-cookie";
import { BASE_URL } from "../../services/api";
import axios from "axios";
import Task from "./Task";

const cookies = new Cookies();

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

    try {
      const response = await axios.delete(
        `${BASE_URL}/delete_task/${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      localStorage.setItem("currentProject", JSON.stringify(response.data));
      localStorage.removeItem("currentTask");
      setSelectedTask("");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEditTask = async (task_id) => {
    const cookie = cookies.get("auth_token");

    try {
      const response = await axios.put(`${BASE_URL}/edit_task/${task_id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      localStorage.setItem("currentProject", JSON.stringify(response.data));
      localStorage.removeItem("currentTask");
      setSelectedTask("");
      window.location = "/task_list";
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
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
        <section className="bg-gray-100 w-full min-h-screen bg-cover bg-center">
          <div className="max-w-5xl mx-auto p-5 lg:px-0">
            <h1 className="text-3xl font-bold pt-8 pb-5">{project.name}</h1>
            <p className="text-lg font-light mb-10">
              You currently have {project.tasks.length} tasks in {project.name}.
            </p>
            <div>
              <ul className="space-y-4">
                {project.tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    editTask={() => handleEditTask(task.id)}
                    deleteTask={() => handleDeleteTask(task.id)}
                    projectId={project.id}
                    setSelectedTask={setSelectedTask}
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
