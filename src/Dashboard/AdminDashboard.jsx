import React, { useEffect, useState } from "react";
import {
  Header,
  TaskListNumbers,
  AdimnEmployeeTaskStatus,
  AddNewEmployee,
  AddNewTask,
  Footer,
} from "../components";
import { getAuthData } from "../context";
import { FiPlus, FiUserPlus, FiList } from "react-icons/fi";

function AdminDashboard() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees") || [])
  );

  const [activeTab, setActiveTab] = useState("task");

  const { theme } = getAuthData();

  useEffect(() => {
    if (employees) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);

  // Theme-based styles
  const themeClasses =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800";

  return (
    <div className={`min-h-screen p-4 md:p-6 ${themeClasses}`}>
      {/* Header */}
      <Header textClass={theme === "dark" ? "text-white" : "text-gray-800"} />

      {/* Task Statistics */}
      <TaskListNumbers />

      {/* Tab Navigation */}
      <div className="flex mb-8">
        <div
          className={`relative flex rounded-lg p-1 ${
            theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"
          } mx-auto`}
        >
          {/* Active tab indicator */}
          <div
            className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ${
              activeTab === "task"
                ? "left-1 right-1/2 bg-blue-500/10 border border-blue-500/20 shadow-md"
                : "left-1/2 right-1 bg-blue-500/10 border border-blue-500/20 shadow-md"
            }`}
          />

          <button
            onClick={() => setActiveTab("task")}
            className={`relative z-10 flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
              activeTab === "task"
                ? theme === "dark"
                  ? "text-blue-400"
                  : "text-blue-600"
                : theme === "dark"
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiPlus
              className={`mr-2 ${
                activeTab === "task"
                  ? "stroke-blue-400"
                  : theme === "dark"
                  ? "stroke-gray-400"
                  : "stroke-gray-500"
              }`}
            />
            Add New Task
          </button>

          <button
            onClick={() => setActiveTab("employee")}
            className={`relative z-10 flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
              activeTab === "employee"
                ? theme === "dark"
                  ? "text-blue-400"
                  : "text-blue-600"
                : theme === "dark"
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiUserPlus
              className={`mr-2 ${
                activeTab === "employee"
                  ? "stroke-blue-400"
                  : theme === "dark"
                  ? "stroke-gray-400"
                  : "stroke-gray-500"
              }`}
            />
            Add Employee{" "}
           
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8 transition-all duration-300">
        {activeTab === "employee" ? <AddNewEmployee /> : <AddNewTask />}
      </div>

      {/* Employee Task Status Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FiList
            className={`mr-2 ${
              theme === "dark" ? "stroke-blue-400" : "stroke-blue-600"
            }`}
          />
          <h2
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Employee Task Status
          </h2>
        </div>
        <AdimnEmployeeTaskStatus
          styleClass={{
            textClass: theme === "dark" ? "text-gray-300" : "text-gray-700",
          }}
        />
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
