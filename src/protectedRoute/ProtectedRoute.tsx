// ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../apiHandler/getCurrentUser";
import { useLogout } from "../hook/useLogout";

interface ProtectedRouteProps {
  children: React.ReactElement<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          logout();
          navigate("/login");
        } else {
          setUser(currentUser.user);
        }
      } catch (err) {
        console.error("Error checking user:", err);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate, logout]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
  <div className="relative w-32 h-32">
    <div className="absolute inset-0 border-8 border-t-8 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-green-500 text-xl font-bold">Loading</span>
    </div>
  </div>
</div>

    );

  // Pass user as prop to child component
  return React.cloneElement(children, { user });
};

export default ProtectedRoute;
