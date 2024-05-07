import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const Drawer = ({ items, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    console.log(location);
  };

  return (
    <div className="flex flex-col w-60 h-auto p-3 text-gray-800">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">{title}</div>
        <button onClick={toggleDrawer} className="text-lg">
          {isOpen ? (
            <FaAngleUp className="h-6 w-6" />
          ) : (
            <FaAngleDown className="h-6 w-6" />
          )}
        </button>
      </div>
      <div
        className={`flex-grow w-full transition-all duration-500 ease-in-out ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <ul className="w-full p-2">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.link || ""}
              className={({ isActive }) => (isActive ? "bg-orange-200" : "")}
            >
              <li
                className={`flex items-center px-3 py-2 ${
                  location.pathname === `/${item.link}`
                    ? "bg-orange-400 text-white mr-2 rounded-lg"
                    : ""
                }`}
              >
                {item.icon || <span className="mr-3">{item.icon}</span>}
                <p className="ml-3 w-full p-1 justify-between flex items-center">
                  {item.name}{" "}
                  <span
                    className={`h-3 w-3 ml-4 rounded-full ${item.color}`}
                  ></span>
                </p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
