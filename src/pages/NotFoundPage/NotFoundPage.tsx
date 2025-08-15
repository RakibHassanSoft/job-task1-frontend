// NotFoundPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      {/* Main content */}
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <XCircleIcon className="w-32 h-32 text-green-200 animate-pulse" />
        </div>

        {/* Big 404 text */}
        <h1 className="text-9xl font-extrabold text-green-200 mb-4 drop-shadow-lg">
          404
        </h1>

        {/* Heading */}
        <p className="text-3xl font-semibold text-green-800 mb-4">
          Oops! Page not found.
        </p>

        {/* Description */}
        <p className="text-lg text-green-900 mb-8 max-w-lg mx-auto">
          The page you’re looking for doesn’t exist or has been moved. Please
          check the URL or return to the homepage.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-green-200 hover:bg-green-300 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
