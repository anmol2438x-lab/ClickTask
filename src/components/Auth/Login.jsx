import React, { useState } from "react";
import { UserSelector } from "../index";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    if (!rememberMe) {
      setEmail("");
      setPassword("");
    }
  };

  // Theme-based styles
  const containerStyle = `min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-[80px] md:pt-0 ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;

  const cardStyle = `p-8 rounded-xl shadow-xl w-full max-w-md transition-all duration-300 ${
    theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-200"
  }`;

  const inputStyle = `mt-1 block w-full px-4 py-3 rounded-lg transition-all duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
  } border focus:outline-none focus:ring-2`;

  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const titleColor = theme === "dark" ? "text-white" : "text-gray-800";
  const linkColor = theme === "dark" ? "text-blue-400" : "text-blue-600";

  return (
    <div className={containerStyle}>
      <UserSelector theme={theme} />

      <div className={cardStyle}>
        {/* Login Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
            <FaUser className="fill-blue-500 text-2xl" />
          </div>
          <h2 className={`text-2xl font-bold ${titleColor}`}>Welcome Back</h2>
          <p className={`mt-2 ${textColor}`}>
            Please enter your credentials to login
          </p>
        </div>

        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${textColor}`}
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope
                  className={`${
                    theme === "dark" ? "fill-gray-400" : "fill-gray-500"
                  }`}
                  fill="currentColor"
                />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                className={`${inputStyle} pl-10`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${textColor}`}
            >
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock
                  className={`${
                    theme === "dark" ? "fill-gray-400" : "fill-gray-500"
                  }`}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className={`${inputStyle} pl-10 pr-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 pr-3 flex items-center`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash
                    className={`${
                      theme === "dark" ? "fill-gray-400" : "fill-gray-500"
                    }`}
                  />
                ) : (
                  <FaEye
                    className={`${
                      theme === "dark" ? "fill-gray-400" : "fill-gray-500"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 rounded ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-blue-500"
                    : "bg-gray-100 border-gray-300 text-blue-500"
                }`}
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 text-sm ${textColor}`}
              >
                Remember me
              </label>
            </div>
            <a href="#" className={`text-sm ${linkColor} hover:underline`}>
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${textColor}`}>
            Don't have an account?{" "}
            <a href="#" className={`${linkColor} font-medium hover:underline`}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
