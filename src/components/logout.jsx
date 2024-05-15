import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function Logout() {
  const handleLogout = () => {
    localStorage.clear();
    cookies.remove("auth_token");
    window.location = "/login";
  };

  return (
    <div className="w-full flex h-full">
      <button
        onClick={handleLogout}
        className="bg-red-400 p-2 rounded mb-2 mx-auto"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
