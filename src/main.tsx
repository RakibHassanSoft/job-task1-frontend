import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import Login from "./pages/login/Login";
import "./index.css";
import RegisterPage from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import DashboardHome from "./pages/dashboard/DashboardHome/dashboardHome";
import CreateExpance from "./pages/dashboard/CreateExpance/CreateExpance";
import DashboardOperation from "./pages/dashboard/Dashboardoperation/DashboardOperation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
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
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "create-expense",
        element: <CreateExpance />,
      },
      {
        path: "operation",
        element: <DashboardOperation />,
      },
    ],
  },
]);


const queryClient = new QueryClient(); // <-- create instance

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
 
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

);

