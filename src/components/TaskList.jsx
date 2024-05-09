import React, { useState } from "react";
import Tasks from "./Tasks";

function TaskList({ projects }) {
  return (
    <React.Fragment>
      {!projects ? (
        <p>Loading...</p>
      ) : (
        <div className="flex w-full">
          <div className="flex flex-col w-3/5">
            {projects.map((project, index) => (
              <div className="flex flex-row" key={index}>
                <Tasks project={project} />
              </div>
            ))}
          </div>
          <div className="w-2/5 bg-gray-100 h-screen overflow-y-auto">
            Task details
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default TaskList;
