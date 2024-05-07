import React, { useEffect, useState } from "react";
import MainComponent from "./mainComponent";
import Sidebar from "./sideBar";
import { Routes, Route, Outlet } from "react-router-dom";
import TaskList from "./TaskList";
import Settings from "./Settings";
import DashBoard from "./DashBoard";
import Calendar from "./Calendar";
import Cookies from "universal-cookie";
import { BASE_URL } from "../services/api";
import axios from "axios";

const cookies = new Cookies();

function Container() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllProjects = async () => {
    const cookie = cookies.get("auth_token");
    setIsLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/get_projects`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const loadProjects = () => {
      fetchAllProjects();
    };

    loadProjects();

    return () => {
      source.cancel("Component unmounted, request cancelled");
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      {isLoading ? (
        <div>
          <h1>App loading</h1>
        </div>
      ) : (
        <div className="ml-60 flex-1 flex h-screen">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/project_overview/:projectId"
              element={<MainComponent />}
            />
            <Route
              path="/task_list"
              element={<TaskList projects={projects} />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Container;
