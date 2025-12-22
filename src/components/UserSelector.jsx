import React, { useState } from "react";
import { getAuthData } from "../context";
import { FaUserShield, FaUserTie, FaUser, FaCopy } from "react-icons/fa";

const UserSelector = ({ theme }) => {
  const [role, setRole] = useState("");
  const [userSelect, setUserSelect] = useState("");
  const [user, setUser] = useState(null);
  const [emailOrPass, setEmailOrPass] = useState({ 
    email: "", 
    password: "" 
  });
  const [copied, setCopied] = useState({ 
    email: false, 
    password: false 
  });

  const { userData } = getAuthData();
  const { adminData = [], employeesData = [] } = userData || {};

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole === "admin") {
      setUser(adminData);
    } else if (selectedRole === "employee") {
      setUser(employeesData);
    } else {
      setUser(null);
    }
    setUserSelect("");
    setEmailOrPass({ email: "", password: "" });
    setCopied({ email: false, password: false });
  };

  const handleUserChange = (e) => {
    const selectedUser = e.target.value;
    setUserSelect(selectedUser);

    const selectedUserData = user?.find((item) => item.name === selectedUser);
    if (selectedUserData) {
      setEmailOrPass({
        email: selectedUserData.email,
        password: selectedUserData.password,
      });
    } else {
      setEmailOrPass({ email: "", password: "" });
    }
    setCopied({ email: false, password: false });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Theme-based styles
  const cardStyle = `rounded-xl shadow-lg w-full max-w-md transition-all duration-300 ${
    theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-200"
  }`;

  const selectStyle = `mt-1 block w-full p-3 rounded-lg transition-all duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
  } border focus:outline-none focus:ring-2`;

  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const titleColor = theme === "dark" ? "text-white" : "text-gray-800";
  const infoCardStyle = `p-4 rounded-lg mb-4 ${
    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
  }`;

  return (
    <div className={`p-6 md:p-8 ${cardStyle}`}>
      {/* Title */}
      <div className="flex flex-col items-center mb-6">
        <div className={`p-3 rounded-full mb-3 ${
          theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
        }`}>
          {role === "admin" ? (
            <FaUserShield className="fill-blue-500" size={24} />
          ) : role === "employee" ? (
            <FaUserTie className="fill-blue-500" size={24} />
          ) : (
            <FaUser className="fill-blue-500" size={24} />
          )}
        </div>
        <h2 className={`text-2xl font-bold ${titleColor} text-center`}>
          Login Information
        </h2>
        <p className={`text-sm ${textColor} mt-1`}>
          Select a role and user to autofill credentials
        </p>
      </div>

      {/* Role Selection */}
      <div className="mb-5">
        <label htmlFor="role-select" className={`block text-sm font-medium ${textColor} mb-2`}>
          Select Role
        </label>
        <div className="relative">
          <select
            id="role-select"
            className={`${selectStyle} pl-10`}
            value={role}
            onChange={handleRoleChange}
          >
            <option className={`${selectStyle}`} value="">Select a role</option>
            <option className={`${selectStyle}`} value="admin">Admin</option>
            <option className={`${selectStyle}`} value="employee">Employee</option>
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {role === "admin" ? (
              <FaUserShield className={theme === "dark" ? "fill-gray-400" : "fill-gray-500"} />
            ) : role === "employee" ? (
              <FaUserTie className={theme === "dark" ? "fill-gray-400" : "fill-gray-500"} />
            ) : (
              <FaUser className={theme === "dark" ? "fill-gray-400" : "fill-gray-500"} />
            )}
          </div>
        </div>
      </div>

      {/* User Selection */}
      <div className="mb-6">
        <label htmlFor="user-select" className={`block text-sm font-medium ${textColor} mb-2`}>
          Select User
        </label>
        <div className="relative">
          <select
            id="user-select"
            className={`${selectStyle} pl-10`}
            value={userSelect}
            onChange={handleUserChange}
            disabled={!user || user.length === 0}
          >
            <option className={`${selectStyle}`} value="">{user?.length ? "Select a user" : "No users available"}</option>
            {user?.map((item, index) => (
              <option className={`${selectStyle}`} key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className={theme === "dark" ? "fill-gray-400" : "fill-gray-500"} />
          </div>
        </div>
      </div>

      {/* Credentials Display */}
      {emailOrPass.email && (
        <div className={infoCardStyle}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${textColor}`}>Email</h3>
            <button
              onClick={() => copyToClipboard(emailOrPass.email, "email")}
              className={`flex items-center text-xs px-2 py-1 rounded ${
                theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaCopy className={`mr-1 ${theme === "dark" ? "fill-gray-300" : "fill-gray-700"}`} size={12} />
              {copied.email ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className={`text-sm break-all ${textColor}`}>{emailOrPass.email}</p>
        </div>
      )}

      {emailOrPass.password && (
        <div className={infoCardStyle}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${textColor}`}>Password</h3>
            <button
              onClick={() => copyToClipboard(emailOrPass.password, "password")}
              className={`flex items-center text-xs px-2 py-1 rounded ${
                theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaCopy className={`mr-1 ${theme === "dark" ? "fill-gray-300" : "fill-gray-700"}`} size={12} />
              {copied.password ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className={`text-sm break-all ${textColor}`}>{emailOrPass.password}</p>
        </div>
      )}

      {/* Instructions */}
      <div className={`mt-6 p-3 rounded-lg text-center ${
        theme === "dark" ? "bg-blue-900/20 text-blue-300" : "bg-blue-100 text-gray-800"
      }`}>
        <p className={`text-sm  ${
        theme === "dark" ? "text-blue-300" : "text-gray-800"
      }`}>
          {emailOrPass.email ? "Credentials ready to paste!" : "Select a user to view credentials"}
        </p>
      </div>
    </div>
  );
};

export default UserSelector;