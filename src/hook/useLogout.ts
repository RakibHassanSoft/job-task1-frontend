// useLogout.ts
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../apiHandler/api"; // import the Axios instance
import Swal from "sweetalert2";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Call backend logout route
       await privateAxios.post("/auth/logout", {}, { withCredentials: true });
//  console.log(res)
      // Redirect to login
      navigate("/login");
    } catch (err) {
      // console.error("Logout failed:", err);
      Swal.fire({
    icon: "error",
    title: "Error",
    text:  "Logout failed",
  });

    }
  };

  return logout;
};
