import React, { useState } from "react";
import type { FormEvent } from "react";
import { publicAxios } from "../../apiHandler/api";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data } = await publicAxios.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      
      setSuccess("Registration successful!");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      console.log("Register success:", data);
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any ) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Logo"
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-purple-600 mb-8">
          CREATE ACCOUNT
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-bold mb-1">NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-full border border-gray-200 bg-gray-100
              shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block text-sm font-bold mb-1">EMAIL</label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-full border border-gray-200 bg-gray-100
              shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block text-sm font-bold mb-1">PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-full border border-gray-200 bg-gray-100
              shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block text-sm font-bold mb-1">CONFIRM PASSWORD</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 rounded-full border border-gray-200 bg-gray-100
              shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-full font-bold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        <button
          onClick={() => (window.location.href = "/login")}
          className="w-full bg-orange-500 text-white py-2 rounded-full font-bold mt-4 hover:bg-orange-600 transition"
        >
          BACK TO LOGIN
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
