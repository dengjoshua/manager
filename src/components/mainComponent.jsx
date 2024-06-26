import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import ProjectDetails from "./ProjectDetails";
import TaskSection from "./TaskSection";
import Cookies from "universal-cookie";
import axios from "axios";
import { BASE_URL } from "../services/api";
import LoadingDots from "./common/LoadingDots";

const cookies = new Cookies();

const MainComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({});

  const projectId = localStorage.getItem("currentProjectId");

  const fetchProject = async () => {
    if (projectId) {
      const cookie = cookies.get("auth_token");
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/get_project/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  return (
    <div className="flex-grow bg-white">
      {isLoading ? (
        <div className="fixed inset-0 bg-white ml-60 flex justify-center items-center">
          <LoadingDots />
        </div>
      ) : (
        <div>
          <Banner project={project} />
          <div className="p-1 rounded-lg">
            <ProjectDetails project={project} />
            <TaskSection tasks={project.tasks} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
