import { Outlet, Link, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      {!hideNavbar && (
        <nav className= "bg-white   w-7xl m-auto shadow-md px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-emerald-600">NestMart</div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Register
            </Link>
          </div>
        </nav>
      )}

      {/* Page Content */}
      <main className="flex-1  flex items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
