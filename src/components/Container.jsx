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
import { ProtectedRoute } from "./ProtectedRoute";

const cookies = new Cookies();

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
    try {
      const response = await axios.get(`${BASE_URL}/get_user_details`, {
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
        <div>
          <h1>App loading</h1>
        </div>
      ) : (
        <div className="flex">
          <Sidebar user={user} />
          <div className="ml-60 h-screen">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashBoard />
                  </ProtectedRoute>
                }
              />
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
            </Routes>
          </div>
          <Outlet />
        </div>
      )}
    </React.Fragment>
  );
}

export default Container;
