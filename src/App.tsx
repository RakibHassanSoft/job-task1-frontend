import { Outlet, Link, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      {!hideNavbar && (
        <nav className="bg-white w-full shadow-md px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-emerald-600">
              NestMart
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md border border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm sm:text-base"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Page Content */}
      <main className="flex-1 flex items-center justify-center p-1 lg:p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
