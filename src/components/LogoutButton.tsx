// LogoutButton.tsx
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "../hook/useLogout";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const logout = useLogout(); // get the logout function

  return (
    <button
      onClick={logout} // call the logout function
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium ${className}`}
    >
      <FiLogOut /> Logout
    </button>
  );
};

export default LogoutButton;
