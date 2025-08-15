import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome/dashboardHome";
import CreateExpance from "./pages/dashboard/CreateExpance/CreateExpance";
import DashboardOperation from "./pages/dashboard/Dashboardoperation/DashboardOperation";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Optional: Customize NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

// Component to handle NProgress on navigation
const NProgressHandler: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return null;
};

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "create-expense", element: <CreateExpance /> },
      { path: "operation", element: <DashboardOperation /> },
    ],
  },
]);

const RouterWithProgress: React.FC = () => (
  <>
    <NProgressHandler />
    <RouterProvider router={router} />
  </>
);

export default RouterWithProgress;
