import React, { useState, useEffect } from "react";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";

function Calendar({ projects }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (projects) {
      const allTasks = aggregateTasks(projects);
      setDays(generateMonthDays(allTasks));
    }
  }, [projects]);

  const aggregateTasks = (projects) => {
    let allTasks = [];
    projects.forEach((project) =>
      project.tasks.forEach((task) => {
        allTasks.push(task);
      })
    );
    console.log(allTasks.length);
    return allTasks;
  };

  const tasksByDate = (tasks) => {
    const byDate = {};
    tasks.forEach((task) => {
      const parsedDate = parseISO(task.date);
      if (!isNaN(parsedDate)) {
        const dayKey = format(parsedDate, "yyyy-MM-dd");
        if (!byDate[dayKey]) {
          byDate[dayKey] = [];
        }
        byDate[dayKey].push(task);
      } else {
        console.error("Invalid date:", task.date);
      }
    });
    return byDate;
  };

  const generateMonthDays = (tasks) => {
    const today = new Date();
    const startDay = startOfWeek(startOfMonth(today));
    const endDay = endOfWeek(endOfMonth(today));
    let day = startDay;
    const dayMap = tasksByDate(tasks);
    const monthDays = [];
    while (day <= endDay) {
      const dayKey = format(day, "yyyy-MM-dd");
      monthDays.push({
        id: dayKey,
        name: format(day, "eee d"),
        tasks: dayMap[dayKey] || [],
      });
      day = addDays(day, 1);
    }
    return monthDays;
  };

  return (
    <div className="calendar bg-white grid grid-cols-7 gap-1 w-full">
      {days.map((day) => (
        <div
          key={day.id}
          className="day bg-gray-100 border border-gray-300 p-2 flex flex-col w-auto h-56"
        >
          <span className="date text-sm font-bold">{day.name}</span>
          {day.tasks.map((task, index) => (
            <div key={task.task_id} className="todo p-1 mt-1">
              <div>{task.name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
