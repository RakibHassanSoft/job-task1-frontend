import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../apiHandler/getCurrentUser";
import Swal from "sweetalert2";
import {  XMarkIcon } from "@heroicons/react/24/outline";
import LogoutButton from "../../components/LogoutButton";
import { useLogout } from "../../hook/useLogout";

const routes = [
  { name: "Dashboard", path: "/dashboard", end: true },
  { name: "Create Expense", path: "create-expense", end: true },
  { name: "Operation", path: "operation", end: true },
 
];

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function fetchCurrentUser() {
    try {
      const user = await getCurrentUser();

      if (!user) {
        logout(); // Call the logout function from useLogout hook
        navigate("/login");
        return;
      }
    } catch (error) {
      Swal.fire({
        title: "Not logged in!",
        text: "Please log in to access full features.",
        icon: "error",
        confirmButtonColor: "#22c55e",
        timer: 3000,
        timerProgressBar: true,
      });
      logout();
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="  min-h-screen flex bg-gray-100 text-gray-700">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 mt-16 z-40 bg-white w-64 border-r border-gray-200 transform transition-transform lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 grid place-items-center">
              <span className="text-green-500 font-bold">N</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-emerald-600 text-xl">Nest</div>
              <div className="text-xs text-gray-400 -mt-0.5">
                Mart & Grocery
              </div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <nav className="p-4 space-y-1 text-sm">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 font-medium ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "hover:bg-gray-50"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {route.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r border-gray-200">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-gray-200">
          <div className="w-9 h-9 rounded-full bg-green-100 grid place-items-center">
            <span className="text-green-500 font-bold">N</span>
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-emerald-600 text-xl">Nest</div>
            <div className="text-xs text-gray-400 -mt-0.5">Mart & Grocery</div>
          </div>
        </div>
        <nav className="p-4 space-y-1 text-sm">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 font-medium ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "hover:bg-gray-50"
                }`
              }
            >
              {route.name}
            </NavLink>
          ))}
        </nav>
        {/* line border  */}
        <div className="border-t border-gray-200 my-4"></div>
        {/* Logout Button */}
        <div className=" px-4 py-2">
          <LogoutButton className="w-full justify-start" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 justify-between">
          {/* Left: Title and subtitle */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <span className="text-sm text-gray-500">Welcome back, Rakib!</span>
          </div>

          {/* Right: User avatar */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-gray-700 text-sm font-medium">
              Rakib Ahmed
            </span>
            <img
              className="w-9 h-9 rounded-full ring-2 ring-white object-cover"
              src="https://i.pravatar.cc/100?img=67"
              alt="user"
            />
          </div>
        </header>

        {/* Outlet */}
        <section className="flex-1 p-0 bg-gray-50 lg:p-8 overflow-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
