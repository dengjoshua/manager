import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Container from "./components/Container";
import SignUp from "./components/Auth/Signup";
import { ProjectProvider } from "./context/ProjectContext";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const isAuthenticated = () => !!cookies.get("auth_token");

function App() {
  const user = true;
  return (
    <div className="bg-gray-100">
      <ProjectProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {user && <Container />}
      </ProjectProvider>
    </div>
  );
}

export default App;
