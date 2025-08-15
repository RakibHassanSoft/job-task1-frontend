// Login.tsx
import React, { useState } from "react";
import type { FormEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://your-server.com/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data: { message?: string; token?: string } = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       console.log("Login successful:", data);
//       // TODO: handle token, redirect, or update app state
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);
};

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6 h-24 ">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Logo"
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-purple-600 mb-8">
          LOGIN
        </h2>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-bold mb-1">EMAIL</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 rounded-full border border-gray-200 bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block text-sm font-bold mb-1">PASSWORD</label>
          <div className="relative mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">👁</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-full font-bold hover:bg-orange-600 transition"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <button
          onClick={() => (window.location.href = "/register")}
          className="w-full bg-orange-500 text-white py-2 rounded-full font-bold mt-4 hover:bg-orange-600 transition"
        >
          CREATE NEW ACCOUNT
        </button>
      </div>
    </div>
  );
}
