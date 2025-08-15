// useLogout.ts
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../apiHandler/api"; // import the Axios instance

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Call backend logout route
      await privateAxios.post("/auth/logout", {}, { withCredentials: true });

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return logout;
};
