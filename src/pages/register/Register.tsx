import React, { useState } from "react";
import type { FormEvent } from "react";
import { publicAxios } from "../../apiHandler/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  // Check password match
  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Passwords do not match",
    });
    setLoading(false);
    return;
  }

  try {
    const { data } = await publicAxios.post("/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (data) {
      setSuccess("Registration successful!");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You will be redirected to the login page shortly.",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      // console.log("Register success:", data);
    }
  } catch (err: any) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response.data.message,
      });
    } else {
      const msg = err.message || "Registration failed";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: msg,
      });
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4 w-full">
  <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
    {/* Logo */}
    <div className="flex justify-center mb-6 h-24">
      <img
        src="https://tse3.mm.bing.net/th/id/OIP.1d7TQI67pwfr0F5jqTgD1AHaGw?rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Logo"
        className="rounded-full shadow-lg w-20 h-20 object-cover"
      />
    </div>

    {/* Title */}
    <h2 className="text-center text-3xl font-bold text-green-700 mb-8">
      CREATE ACCOUNT
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-green-50
            shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-green-50
            shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-green-50
            shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-green-50
            shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "REGISTER"}
      </button>
    </form>

    <div className="mt-6 text-center">
      <button
        onClick={() => navigate("/login")}
        className="text-green-600 font-semibold hover:underline"
      >
        Back to Login
      </button>
    </div>
  </div>
</div>

  );
};

export default RegisterPage;
