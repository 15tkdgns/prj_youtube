import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold mb-6">대시보드 🎉</h1>

      <Link to="/scrapbook" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        📒 Scrapbook
      </Link>

      <Link to="/videos" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
        📺 Video List
      </Link>

      <Link to="/settings" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        ⚙ Settings
      </Link>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default DashboardPage;
