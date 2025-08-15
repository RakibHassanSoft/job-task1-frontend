// ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./auth";

interface ProtectedRouteProps {
  children: React.ReactElement<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  // Pass user as prop to child
  return React.cloneElement(children, { user });
};

export default ProtectedRoute;
