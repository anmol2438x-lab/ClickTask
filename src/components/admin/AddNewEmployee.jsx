import React, { memo, useEffect, useState } from "react";
import { getAuthData } from "../../context";
import { FiUserPlus, FiUser, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

function AddNewEmployee() {
  const { userData, setUserData, theme } = getAuthData();  

  const inputClass =
    theme === "dark"
      ? "bg-gray-800 text-white border-2 border-gray-700 focus:ring-blue-500"
      : "bg-white text-gray-800 border-2 border-gray-300 focus:ring-blue-500";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-700";

  const [newEmployee, setNewEmployee] = useState({
    name: "", 
    email: "",
    password: "",
  });

  useEffect(() => {
    setNewEmployee({
      ...newEmployee,
      name: newEmployee.name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    })
  }, [newEmployee.name])

  const handleNewEmployeeForm = (e) => {
    e.preventDefault();

    if (!newEmployee.name || !newEmployee.email || !newEmployee.password) {
      toast.error("Please fill all fields", {
        position: "top-center",
        style: {
          background: theme === "dark" ? "#1F2937" : "#F3F4F6",
          color: theme === "dark" ? "#F9FAFB" : "#111827",
        },
      });
      return;
    }

    const { employeesData } = userData;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());    

    const updatedEmployees = [
      ...employeesData,
      { ...data, id: Date.now(), tasks: [] },
    ];

    setUserData({ ...userData, employeesData: updatedEmployees });
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    toast.success(`🎉 ${newEmployee.name} has joined the team!`, {
      position: "top-center",
      style: {
        background: theme === "dark" ? "#1F2937" : "#F3F4F6",
        color: theme === "dark" ? "#F9FAFB" : "#111827",
      },
      iconTheme: {
        primary: "#3B82F6",
        secondary: theme === "dark" ? "#1F2937" : "#F3F4F6",
      },
    });

    setNewEmployee({ name: "", email: "", password: "" });
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-sm border ${
        theme === "dark"
          ? "bg-gray-800/80 border-gray-700"
          : "bg-white border-gray-200"
      } mb-8 transition-all duration-300`}
    >
      
      <div className="flex items-center mb-6">
        <div
          className={`p-2 rounded-lg ${
            theme === "dark"
              ? "bg-blue-900/30 text-blue-400"
              : "bg-blue-100 text-blue-600"
          } mr-3`}
        >
          <FiUserPlus
            className={`text-xl ${
              theme === "dark" ? " stroke-blue-400" : " stroke-blue-600"
            }`}
          />
        </div>
        <h2 className={`text-xl font-bold ${textClass}`}>Add New Employee</h2>
      </div>

      <form onSubmit={handleNewEmployeeForm} className="space-y-4">
        <div className="space-y-1">
          <label
            className={`block text-sm font-medium ${textClass} flex items-center`}
          >
            <FiUser
              className={`mr-2 ${
                theme === "dark" ? "stroke-white" : "stroke-gray-800"
              }`}
            />{" "}
            Employee Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Rahul Rawat"
            />
            <FiUser
              className={`absolute left-3 top-3 ${
                theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
              }`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            className={`block text-sm font-medium ${textClass} flex items-center`}
          >
            <FiMail
              className={`mr-2 ${
                theme === "dark" ? "stroke-white" : "stroke-gray-800"
              }`}
            />{" "}
            Employee Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee((prev) => ({ ...prev, email: e.target.value }))
              }
              className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="john@example.com"
            />
            <FiMail
              className={`absolute left-3 top-3 ${
                theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
              }`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            className={`block text-sm font-medium ${textClass} flex items-center`}
          >
            <FiLock
              className={`mr-2 ${
                theme === "dark" ? "stroke-white" : "stroke-gray-800"
              }`}
            />{" "}
            Employee Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="••••••••"
            />
            <FiLock
              className={`absolute left-3 top-3 ${
                theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
              }`}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 flex items-center justify-center ${
            theme === "dark" ? "shadow-lg shadow-blue-500/20" : ""
          }`}
        >
          <FiUserPlus className="mr-2" />
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default memo(AddNewEmployee);
