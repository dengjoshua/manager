import React from "react";
import { FaEllipsisH, FaPlusSquare, FaStar } from "react-icons/fa";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { format, isToday, isBefore } from "date-fns";

const formatDate = (date) => {
  return format(date, "PPP");
};

function TaskSection({ tasks }) {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const today = new Date();

  const todayTasks = tasks.filter((task) => isToday(new Date(task.date || "")));
  const overdueTasks = tasks.filter(
    (task) => !task.finished && isBefore(new Date(task.date || ""), today)
  );
  const inProgressTasks = tasks.filter((task) => !task.finished);
  const completedTasks = tasks.filter((task) => task.finished);

  return (
    <div className="grid grid-cols-5 bg-gray-100 p-2 gap-4">
      <TaskColumn tasks={todayTasks} title="Today" />
      <TaskColumn tasks={inProgressTasks} title="Inprogress" />
      <TaskColumn tasks={completedTasks} title="Completed" />
      <TaskColumn tasks={overdueTasks} title="Overdue" />
      <div>
        <h1>Others</h1>
      </div>
    </div>
  );
}

function TaskColumn({ tasks, title }) {
  return (
    <div>
      <div className="bg-white box items-center p-2 text-sm text-gray-800 align-center flex justify-between rounded-lg mb-2">
        <h1>{title}</h1>
        <span className="flex">
          <FaEllipsisH className="text-sm mr-2 text-gray-800" />
          <FaPlusSquare className="text-md rounded-md text-gray-800" />
        </span>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounded-lg h-32 flex flex-col w-full p-2 my-2 rounded-lg ${
            task.tag ? task.tag.color : ""
          }`}
        >
          <div className="flex justify-between">
            <span className="text-xs flex">
              <FaStar className="mr-1" />
              {task.date ? formatDate(task.date) : "No date"}
            </span>
            <BsArrowUpRightCircle color="red" size={14} />
          </div>
          <h1 className="text-lg m-2">{task.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default TaskSection;
