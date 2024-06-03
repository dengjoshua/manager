import React from "react";
import { FaEllipsisH, FaPlusSquare, FaStar } from "react-icons/fa";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { format, isToday, isBefore } from "date-fns";

const formatDate = (date) => {
  return format(new Date(date), "PPP");
};

function TaskSection({ tasks }) {
  const today = new Date();

  const todayTasks = tasks.filter((task) => isToday(new Date(task.date || "")));
  const overdueTasks = tasks.filter(
    (task) => !task.finished && isBefore(new Date(task.date || ""), today)
  );
  const inProgressTasks = tasks.filter((task) => !task.finished);
  const completedTasks = tasks.filter((task) => task.finished);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 p-4 gap-6">
      <TaskColumn tasks={todayTasks} title="Today" />
      <TaskColumn tasks={inProgressTasks} title="In Progress" />
      <TaskColumn tasks={completedTasks} title="Completed" />
      <TaskColumn tasks={overdueTasks} title="Overdue" />
    </div>
  );
}

function TaskColumn({ tasks, title }) {
  return (
    <div>
      <div className="bg-white box items-center p-3 text-sm text-gray-800 align-center flex justify-between rounded-lg mb-4 shadow">
        <h1 className="font-semibold">{title}</h1>
        <span className="flex items-center">
          <FaEllipsisH className="text-sm mr-2 text-gray-800 cursor-pointer" />
          <FaPlusSquare className="text-md rounded-md text-gray-800 cursor-pointer" />
        </span>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-lg flex flex-col w-full p-3 my-2 shadow ${
              task.tag ? task.tag.color : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs flex items-center text-gray-600">
                <FaStar className="mr-1 text-yellow-500" />
                {task.date ? formatDate(task.date) : "No date"}
              </span>
              <BsArrowUpRightCircle className="text-red-500" size={16} />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">{task.name}</h1>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No tasks available</p>
      )}
    </div>
  );
}

export default TaskSection;
