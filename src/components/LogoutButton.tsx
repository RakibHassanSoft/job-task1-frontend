// LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure to install js-cookie: npm i js-cookie
import { FiLogOut } from "react-icons/fi";

interface LogoutButtonProps {
  className?: string; // optional className to style differently
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove("token");

    // Optionally, remove other user-related cookies or localStorage
    // localStorage.removeItem("user");

    // Redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium ${className}`}
    >
      <FiLogOut /> Logout
    </button>
  );
};

export default LogoutButton;
