// useLogout.ts
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token cookie
    Cookies.remove("token");

    // Redirect to login
    navigate("/login");
  };

  return logout;
};
