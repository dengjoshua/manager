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
    <div>
      <button onClick={handleLogout} className="bg-slate-300">
        Logout
      </button>
    </div>
  );
}

export default Logout;
