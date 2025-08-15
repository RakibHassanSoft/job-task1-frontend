import React from "react";
import { 
  FaClipboardList, 
  FaDollarSign, 
  FaUtensils, 
  FaCarSide, 
  FaShoppingCart, 
  FaEllipsisH 
} from "react-icons/fa";
import type { DashboardStats } from "../DashboardHomeInterface";

interface Props {
  stats: DashboardStats;
}

const TopCards: React.FC<Props> = ({ stats }) => {
  const cards = [
    { title: "Total Expenses", value: stats.totalExpenses, icon: <FaClipboardList />, bg: "bg-green-100", color: "text-green-600" },
    { title: "Total Amount", value: `$${stats.totalAmount.toFixed(2)}`, icon: <FaDollarSign />, bg: "bg-blue-100", color: "text-blue-600" },
    { title: "Food Expenses", value: stats.foodExpenses, icon: <FaUtensils />, bg: "bg-yellow-100", color: "text-yellow-600" },
    { title: "Transport Expenses", value: stats.transportExpenses, icon: <FaCarSide />, bg: "bg-red-100", color: "text-red-600" },
    { title: "Shopping Expenses", value: stats.shoppingExpenses, icon: <FaShoppingCart />, bg: "bg-purple-100", color: "text-purple-600" },
    { title: "Other Expenses", value: stats.otherExpenses, icon: <FaEllipsisH />, bg: "bg-gray-100", color: "text-gray-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="rounded-xl bg-white shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className={`${card.bg} p-3 rounded-full`}>
            {React.cloneElement(card.icon, { className: `${card.color} text-2xl` })}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
            <p className="text-gray-900 text-2xl font-semibold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCards;
