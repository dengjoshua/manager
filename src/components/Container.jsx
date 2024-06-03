import React, { useEffect, useState } from "react";
import MainComponent from "./mainComponent";
import Sidebar from "./sideBar";
import { Routes, Route, Outlet, redirect } from "react-router-dom";
import TaskList from "./Tasks/TaskList";
import Settings from "./Settings";
import DashBoard from "./DashBoard";
import Calendar from "./Calendar/Calendar";
import Cookies from "universal-cookie";
import { BASE_URL } from "../services/api";
import axios from "axios";
import ProtectedRoute from "./ProtectedRoute";
import Assignees from "./Assignees";

const cookies = new Cookies();

const currentProjectId = localStorage.getItem("currentProjectId");

function Container() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});
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

  const fetchUserDetails = async () => {
    const cookie = cookies.get("auth_token");
    console.log(cookie);

    try {
      const response = await axios.get(`${BASE_URL}/user_details`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const loadData = () => {
      fetchAllProjects();
      fetchUserDetails();
    };

    loadData();

    return () => {
      source.cancel("Component unmounted, request cancelled");
    };
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
          <div className="ml-4 text-xl">Loading...</div>
        </div>
      ) : (
        <div className="flex">
          <Sidebar user={user} />
          <div className="ml-60 w-full h-screen">
            <Routes>
              <Route element={<ProtectedRoute />}>
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
                <Route
                  path="/calendar"
                  element={<Calendar projects={projects} />}
                />
                <Route path="/assignees" element={<Assignees />} />
              </Route>
            </Routes>
          </div>
          <Outlet />
        </div>
      )}
    </React.Fragment>
  );
}

export default Container;
