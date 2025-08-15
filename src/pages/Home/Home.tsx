// Home.tsx
import React from "react";
import { UserIcon, CurrencyDollarIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Manage Expenses",
    description:
      "Track all your personal expenses in one place and stay organized effortlessly.",
    icon: <CurrencyDollarIcon className="w-12 h-12 text-green-100" />,
  },
  {
    title: "Visual Insights",
    description:
      "See where your money goes every month with beautiful charts and graphs.",
    icon: <ChartBarIcon className="w-12 h-12 text-green-100" />,
  },
  {
    title: "User Friendly",
    description:
      "Intuitive interface designed for everyone. Add, edit, and view expenses easily.",
    icon: <UserIcon className="w-12 h-12 text-green-100" />,
  },
  {
    title: "Real-time Tracking",
    description:
      "Update your expenses instantly and see live calculations for better budgeting.",
    icon: <ClockIcon className="w-12 h-12 text-green-100" />,
  },
];

const Home: React.FC = () => {
  return (
    <div className="bg-white text-green-900 ">
      {/* Hero Section */}
      <section className="m bg-green-50 min-h-screen flex flex-col justify-center items-center text-center px-4 ">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Expense Tracker
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Manage your personal finances with ease. Track your spending, visualize your expenses, and stay in control of your money.
        </p>
        <button className="bg-green-100 hover:bg-green-200 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-green-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="mb-4 flex justify-center animate-bounce">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-green-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-green-100 py-24 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Why Choose Us?</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-900">
          Our Expense Tracker is designed for simplicity, speed, and clarity. Stay on top of your finances, make informed decisions, and achieve your financial goals without stress.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-50 py-24 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Take Control?</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Sign up now and start tracking your expenses instantly.
        </p>
        <button className="bg-green-100 hover:bg-green-200 text-white font-bold py-3 px-10 rounded-full shadow-lg transition transform hover:scale-105">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;
