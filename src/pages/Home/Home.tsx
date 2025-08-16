// Home.tsx
import React from "react";
import { UserIcon, CurrencyDollarIcon, ChartBarIcon, ClockIcon, DevicePhoneMobileIcon, ShieldCheckIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Manage Expenses",
    description:
      "Track all your personal expenses in one place and stay organized effortlessly.",
    icon: <CurrencyDollarIcon className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Visual Insights",
    description:
      "See where your money goes every month with beautiful charts and graphs.",
    icon: <ChartBarIcon className="w-12 h-12 text-green-600" />,
  },
  {
    title: "User Friendly",
    description:
      "Intuitive interface designed for everyone. Add, edit, and view expenses easily.",
    icon: <UserIcon className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Real-time Tracking",
    description:
      "Update your expenses instantly and see live calculations for better budgeting.",
    icon: <ClockIcon className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Mobile Friendly",
    description: "Access your expenses anytime, anywhere from any device.",
    icon: <DevicePhoneMobileIcon className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and securely stored to protect your privacy.",
    icon: <ShieldCheckIcon className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Global Access",
    description: "Track expenses and budgets while traveling or working remotely.",
    icon: <GlobeAltIcon className="w-12 h-12 text-green-600" />,
  },
];

const Home: React.FC = () => {
  return (
    <div className="text-green-900 font-sans">
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-24 py-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
          Welcome to Expense Tracker
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-8">
          Manage your personal finances with ease. Track your spending, visualize your expenses, and stay in control of your money.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 sm:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12">
          Core Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-green-800 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 sm:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-6 border-l-4 border-green-600 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">1. Add Expenses</h3>
            <p>Quickly add your daily expenses with amounts, categories, and notes for better tracking.</p>
          </div>
          <div className="p-6 border-l-4 border-green-600 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">2. Visualize Spending</h3>
            <p>View interactive charts and summaries to understand your spending habits at a glance.</p>
          </div>
          <div className="p-6 border-l-4 border-green-600 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">3. Make Decisions</h3>
            <p>Set budgets, optimize your spending, and achieve your financial goals efficiently.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 sm:px-12 bg-green-50 text-green-900">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <p className="italic mb-4">"This app made budgeting so easy! I can track every expense and save money effortlessly."</p>
            <h4 className="font-bold">- Sarah J.</h4>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <p className="italic mb-4">"Beautiful design and intuitive interface. Visual charts really help me understand where I spend."</p>
            <h4 className="font-bold">- Mark T.</h4>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <p className="italic mb-4">"Secure and fast. Now I always know my daily spending and plan better."</p>
            <h4 className="font-bold">- Priya R.</h4>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 sm:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">Why Choose Us?</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-900">
          Our Expense Tracker is designed for simplicity, speed, and clarity. Stay on top of your finances, make informed decisions, and achieve your financial goals without stress.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 sm:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">Ready to Take Control?</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Sign up now and start tracking your expenses instantly.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg transition transform hover:scale-105">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;
