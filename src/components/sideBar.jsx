import React from "react";
import {
  FaCog,
  FaHome,
  FaChartBar,
  FaList,
  FaProjectDiagram,
  FaCalendarAlt,
  FaUserCircle,
  FaAngleDown,
  FaUsersCog,
} from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import Logout from "../components/logout";

const Sidebar = ({ user }) => {
  const projectId = localStorage.getItem("currentProjectId");

  const menuItems = [
    { icon: <FaChartBar />, name: "Dashboard", link: "dashboard" },
    { icon: <FaList />, name: "Task List", link: "task_list" },
    {
      icon: <FaProjectDiagram />,
      name: "Project Overview",
      link: projectId ? `/project_overview/${projectId}` : "",
    },
    { icon: <FaCalendarAlt />, name: "Calendar", link: "calendar" },
    { icon: <FaCog />, name: "Settings", link: "settings" },
  ];

  const location = useLocation();

  return (
    <div className="w-60 fixed overflow-hidden bg-gray-100 h-screen">
      <div className="h-32 p-3">
        <h1 className="text-xl flex font-bold">
          <p className="text-orange-500">Task</p>Mate
        </h1>
        <p className="text-sm text-gray-600 font-light">
          Focus. Prioritize. Execute
        </p>
        <div className="mt-2 border px-2 flex items-center rounded-lg cursor-pointer hover:bg-gray-200 py-2">
          <FaUserCircle size={28} className="text-orange-700 mr-3" />
          <section>
            <h2 className="text-sm flex items-center font-bold-400">
              {user.username}
              <FaAngleDown className="ml-1" />
            </h2>
            <p className="text-xs font-light text-gray-600">{user.email}</p>
          </section>
        </div>
      </div>

      <div className="flex flex-col w-60 h-auto p-3 text-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">Menu</div>
        </div>
        <div className="flex-grow w-full transition-all duration-500 ease-in-out">
          <ul className="w-full p-2">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link || ""}
                className={({ isActive }) =>
                  isActive
                    ? "bg-orange-400 text-white mr-2 flex items-center rounded-lg px-3 py-2"
                    : "flex items-center rounded-lg px-3 py-2"
                }
              >
                {item.icon}
                <p className="ml-3">{item.name}</p>
              </NavLink>
            ))}
            <NavLink to="/employees">
              <li
                className={`flex items-center rounded-lg px-3 py-2 ${
                  location.pathname === "/employees"
                    ? "bg-orange-400 text-white mr-2"
                    : ""
                }`}
              >
                <span className="">
                  <FaUsersCog size={20} />
                </span>
                <p className="ml-3">Employees</p>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="bottom">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
