import React, { memo } from "react";
import { getAuthData } from "../context";
import ThemeToggle from "./ThemeToggleBtn";
import { FiLogOut, FiUser } from "react-icons/fi";

function Header({ textClass }) {
  const { currentUser, setUser, theme, loggedInUser } = getAuthData();

  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <header
      className={`sticky top-0 z-20 py-4 mb-8 ${
        theme === "dark"
          ? "bg-gray-800/90 backdrop-blur-sm border-b border-gray-700"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Welcome Message with User Avatar */}
          <div className="flex items-center space-x-4">
            <div
              className={` rounded-full overflow-hidden ${
                theme === "dark"
                  ? "bg-blue-900/30 text-blue-400"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {loggedInUser.role === "admin" ? (
                <img
                  className="w-12"
                  src="/admin.png"
                  alt="Admin profile image"
                />
              ) : (
                <FiUser
                  className={`text-xl ${
                    theme === "dark" ? " stroke-blue-400" : " stroke-blue-600"
                  }`}
                />
              )}
            </div>
            <div>
              <h1 className={`text-sm font-medium ${textClass}`}>
                Welcome back
              </h1>
              <p
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {currentUser ? currentUser.name : "Admin"}
              </p>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* logout button  */}
            <button
              onClick={handleLogOut}
              className={`
              flex items-center gap-2 px-4 py-2 rounded-full shadow-md active:scale-[0.98]
              ${
                theme === "dark"
                  ? "bg-red-600/20 hover:bg-red-600/30"
                  : "bg-red-100 hover:bg-red-200"
              }
            `}
            >
              <FiLogOut
                className={`
                text-lg
                ${theme === "dark" ? "stroke-red-400" : "stroke-red-600"}
              `}
              />
              <span
                className={`${
                  theme === "dark" ? "text-red-300" : "text-red-700"
                } text-base font-medium`}
              >
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
