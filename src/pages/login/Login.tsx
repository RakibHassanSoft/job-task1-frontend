import React, { useState } from "react";
import type { FormEvent } from "react";
import { publicAxios } from "../../apiHandler/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await publicAxios.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      // Success alert
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting to dashboard...",
        timer: 1500,
        showConfirmButton: false,
      });

      // redirect after alert
      navigate("/dashboard");

    } catch (err: any) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || err.message || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen lg:px-4 w-full">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 h-24">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Logo"
            className="rounded-full shadow-lg w-20 h-20 object-cover"
          />
        </div>

        <h2 className="text-center text-3xl font-bold text-green-700 mb-8">
          LOGIN
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-green-50
                shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-green-50
                shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/register")}
            className="text-green-600 font-semibold hover:underline"
          >
            Create a new account
          </button>
        </div>
      </div>
    </div>
  );
}
