import React, { useState } from "react";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { projects } from "../assets/database";

const todos = projects[0].tasks;

const todosByDate = (todos) => {
  const byDate = {};
  todos.forEach((todo) => {
    const dayKey = format(parseISO(todo.date), "yyyy-MM-dd");
    if (!byDate[dayKey]) {
      byDate[dayKey] = [];
    }
    byDate[dayKey].push(todo);
  });
  return byDate;
};

const generateMonthDays = (todos) => {
  const today = new Date();
  const startDay = startOfWeek(startOfMonth(today));
  const endDay = endOfWeek(endOfMonth(today));
  let day = startDay;
  const dayMap = todosByDate(todos);
  const days = [];
  while (day <= endDay) {
    const dayKey = format(day, "yyyy-MM-dd");
    days.push({
      id: dayKey,
      name: format(day, "eee d"),
      todos: dayMap[dayKey] || [],
    });
    day = addDays(day, 1);
  }
  return days;
};

function Calendar() {
  const [days, setDays] = useState(generateMonthDays(todos));

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceIndex = days.findIndex((day) => day.id === source.droppableId);
    const destinationIndex = days.findIndex(
      (day) => day.id === destination.droppableId
    );

    if (sourceIndex === -1 || destinationIndex === -1) return;

    const sourceTasks = Array.from(days[sourceIndex].todos);
    const destTasks = Array.from(days[destinationIndex].todos);
    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);

    const newDays = Array.from(days);
    newDays[sourceIndex] = { ...days[sourceIndex], todos: sourceTasks };
    newDays[destinationIndex] = { ...days[destinationIndex], todos: destTasks };

    setDays(newDays);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="calendar grid grid-cols-7 gap-1 w-full">
        {days.map((day) => (
          <Droppable key={day.id} droppableId={day.id}>
            {(provided) => (
              <div
                className="day bg-blue-100 border border-gray-300 p-2 flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <span className="date text-sm font-bold">{day.name}</span>
                {day.todos.map((todo, index) => (
                  <Draggable
                    key={todo.task_id}
                    draggableId={todo.task_id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        draggable
                        className="todo bg-white p-1 mt-1 rounded shadow"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>{format(parseISO(todo.date), "p")}</div>
                        <div>{todo.name}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Calendar;
