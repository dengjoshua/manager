import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function useProject() {
  return useContext(ProjectContext);
}

export const ProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
};
