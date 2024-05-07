import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginScreen";
import Container from "./components/Container";
import SignUp from "./components/Signup";
import { ProjectProvider } from "./context/ProjectContext";

import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

// const data = jwtDecode(cookies.get("auth_token")) ;
// console.log(data);
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
