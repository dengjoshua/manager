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
import { SelectForm } from "../common/SelectForm";

function Calendar({ projects }) {
  const [days, setDays] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});

  useEffect(() => {
    if (selectedProject) {
      const project = projects.find(
        (project) => project.name === selectedProject
      );
      if (project) {
        setDays(generateMonthDays(project.tasks));
      }
    }
  }, [selectedProject]);

  const handleProjectChange = (option) => {
    setSelectedProject(option);
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
    <div>
      <div className="p-3 flex items-center gap-2">
        <p>Select a project:</p>
        <SelectForm
          options={projects}
          handleSelectOption={handleProjectChange}
          label="Projects"
        />
      </div>
      {!selectedProject ? (
        <div>Select a project to view the tasks in the calendar.</div>
      ) : (
        <div className="calendar bg-white grid grid-cols-7 gap-1 w-full">
          {days.map((day) => (
            <div
              key={day.id}
              className="day bg-gray-100 border border-gray-300 p-2 flex flex-col w-auto h-40"
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
      )}
    </div>
  );
}

export default Calendar;
