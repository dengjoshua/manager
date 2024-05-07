import React from "react";
import { FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

const Banner = ({ project }) => {
  return (
    <div className=" flex h-32 p-4 items-end bg-orange-400 text-white justify-between align-bottom">
      <div className="text-center">
        <p className="text-sm text-slate-200 py-2 flex">
          Projects / <p className="pl-1 text-white">{project.name}</p>
        </p>
        <h1 className="flex">
          <p className="text-xl">{project.name}</p>
          <FaChevronDown className="my-auto pl-2" />
        </h1>
      </div>
      <h4 className="flex items-end text-sm">
        <FaCalendarAlt className="my-auto mr-2" />{" "}
        {format(new Date(), "dd MMM yyyy")}
      </h4>
    </div>
  );
};

export default Banner;
