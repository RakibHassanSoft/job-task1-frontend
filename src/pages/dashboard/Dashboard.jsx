import React from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../apiHandler/getCurrentUser";


const DashboardLayout = () => {
    // Function to fetch the current user
    async function fetchCurrentUser() {
        try {
            const user = await getCurrentUser();
            console.log("Current User:", user);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    }
    // Fetch current user when the component mounts
    React.useEffect(() => {
        fetchCurrentUser();
    }, []);

    console.log(getCurrentUser());
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-700">
      {/* Sidebar */}
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
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 bg-emerald-50 text-emerald-700 font-medium"
            href="/dashboard"
          >
            Dashboard
          </a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50" href="/products">
            Products
          </a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50" href="/orders">
            Orders
          </a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50" href="/sellers">
            Sellers
          </a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50" href="/transactions">
            Transactions
          </a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50" href="/account">
            Account
          </a>
        </nav>
      </aside>

      {/* Right content / Outlet */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 gap-4">
          <input
            className="flex-1 h-11 pl-4 rounded-lg border border-gray-200 bg-gray-50"
            placeholder="Search term"
          />
          <img
            className="w-9 h-9 rounded-full ring-2 ring-white object-cover"
            src="https://i.pravatar.cc/100?img=67"
            alt="user"
          />
        </header>

        {/* Outlet for nested routes */}
        <section className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
