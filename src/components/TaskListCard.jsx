import React, { memo, useEffect, useState } from "react";
import { getAuthData } from "../context/AuthProvider";
import {
  FaCheck,
  FaPlus,
  FaBolt,
  FaExclamationTriangle,
  FaCode,
  FaCalendarAlt,
  FaUserClock,
} from "react-icons/fa";

function TaskListCard({ task, showEmployee = false }) {
  const [status, setStatus] = useState(task.status);
  const { userData, setUserData, currentUser, setCurrentUser, theme } =
    getAuthData();
  const [isHovered, setIsHovered] = useState(false);


  
  useEffect(() => {
    const { employeesData } = userData;
    const singleTaskObj = employeesData
      .map((employee) => employee.tasks)
      .flat(Infinity)
      .find(
        (item) =>
          item.id === task.id && item.employee_name === task.employee_name
      );

    const newTask = { ...singleTaskObj, status: status };

    const updatedEms = employeesData.map((employee) =>
      employee.name === task.employee_name
        ? {
            ...employee,
            tasks: employee.tasks.map((item) =>
              item.id === task.id ? newTask : item
            ),
          }
        : employee
    );

    if (updatedEms) {
      setUserData({
        ...userData,
        employeesData: updatedEms,
      });
      localStorage.setItem("employees", JSON.stringify(updatedEms));

      const updateCurrentUser = updatedEms.find(
        (employee) => employee.id === currentUser.id
      );
      setCurrentUser(updateCurrentUser);
      localStorage.setItem("currentUser", JSON.stringify(updateCurrentUser));
    }
  }, [status]);

  // Theme-aware status configuration
  const statusConfig = {
    completed: {
      bgColor:
        theme === "dark"
          ? "from-emerald-900/20 to-emerald-900/10"
          : "from-emerald-100 to-emerald-50",
      borderColor:
        theme === "dark" ? "border-emerald-800" : "border-emerald-200",
      btnColor: "bg-emerald-500 hover:bg-emerald-600",
      textColor: theme === "dark" ? "text-emerald-400" : "text-emerald-600",
      icon: (
        <FaCheck
          className={theme === "dark" ? "fill-emerald-400" : "fill-emerald-500"}
        />
      ),
      btnText: "Mark Completed",
      badge: "Completed",
    },
    new_task: {
      bgColor:
        theme === "dark"
          ? "from-blue-900/20 to-blue-900/10"
          : "from-blue-100 to-blue-50",
      borderColor: theme === "dark" ? "border-blue-800" : "border-blue-200",
      btnColor: "bg-blue-500 hover:bg-blue-600",
      textColor: theme === "dark" ? "text-blue-400" : "text-blue-600",
      icon: (
        <FaPlus
          className={theme === "dark" ? "fill-blue-400" : "fill-blue-500"}
        />
      ),
      btnText: "Start Task",
      badge: "New",
    },
    failed: {
      bgColor:
        theme === "dark"
          ? "from-rose-900/20 to-rose-900/10"
          : "from-rose-100 to-rose-50",
      borderColor: theme === "dark" ? "border-rose-800" : "border-rose-200",
      btnColor: "bg-rose-500 hover:bg-rose-600",
      textColor: theme === "dark" ? "text-rose-400" : "text-rose-600",
      icon: (
        <FaExclamationTriangle
          className={theme === "dark" ? "fill-rose-400" : "fill-rose-500"}
        />
      ),
      btnText: "Report Issue",
      badge: "Blocked",
    },
    active: {
      bgColor:
        theme === "dark"
          ? "from-amber-900/20 to-amber-900/10"
          : "from-amber-100 to-amber-50",
      borderColor: theme === "dark" ? "border-amber-800" : "border-amber-200",
      btnColor: "bg-amber-500 hover:bg-amber-600",
      textColor: theme === "dark" ? "text-amber-400" : "text-amber-600",
      icon: (
        <FaBolt
          className={theme === "dark" ? "fill-amber-400" : "fill-amber-500"}
        />
      ),
      btnText: "Complete Task",
      badge: "In Progress",
    },
  };

  const currentStatus = statusConfig[status];

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setStatus(isChecked ? "completed" : "active");
  };

  const handleStatus = () => {
    if (status === "new_task") {
      setStatus("active");
    } else if (status === "active") {
      setStatus("completed");
    } else if (status === "completed") {
      setStatus("active");
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const daysRemaining = () => {
    const dueDate = new Date(task.task_date);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  

  return (
    <div
      className={`relative overflow-hidden rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md border ${
        currentStatus.borderColor
      } ${theme === "dark" ? "bg-gray-800" : "bg-white"} h-full flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category and Status */}
      <div className="flex justify-between items-start mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            theme === "dark"
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <FaCode className={`mr-1 ${theme === "dark" ? "fill-gray-300" : "fill-gray-800"}`} /> {task.category.charAt(0).toLocaleUpperCase() + task.category.slice(1).toLocaleLowerCase() }
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.btnColor} text-white`}
        >
          {currentStatus.badge}
        </span>
      </div>

      {/* Task title with icon */}
      <div className="flex items-start mb-3">
        <div
          className={`p-2 rounded-lg mr-3 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          {currentStatus.icon}
        </div>
        <h3
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {task.task_title}
        </h3>
      </div>

      {/* Task description */}
      <p
        className={`text-sm mb-4 flex-grow ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {task.task_description}
      </p>

      {/* Dates information */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div
          className={`flex items-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <FaCalendarAlt className={`mr-2 ${theme === 'dark' ? "fill-gray-400" : "fill-gray-500"}`} />
          <div>
            <div className={`text-xs font-medium ${theme === 'dark' ? "text-gray-400" : "text-gray-500"}`}>Created</div>
            <div className={theme === 'dark' ? "text-gray-400" : "text-gray-500"}>{formatDate(task.created_at)}</div>
          </div>
        </div>
        <div
          className={`flex items-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <FaUserClock className={`mr-2 ${theme === 'dark' ? "fill-gray-400" : "fill-gray-500"}`} />
          <div>
            <div className={`text-xs font-medium ${theme === 'dark' ? "text-gray-400" : "text-gray-500"}`}>Due Date</div>
            <div className={theme === 'dark' ? "text-gray-400" : "text-gray-500"}>{formatDate(task.task_date)}</div>
          </div>
        </div>
        <div className="col-span-2">
          <div
            className={`text-xs ${
              status === "active" ? currentStatus.textColor : "text-gray-500"
            }`}
          >
            {daysRemaining()}
          </div>
        </div>
        {showEmployee && (
          <div className="col-span-2">
            <div
              className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Assigned to:
            </div>
            <div className="text-sm font-medium text-indigo-500">
              {task.employee_name}
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={handleStatus}
          className={`px-3 py-1.5 rounded-md text-white text-sm font-medium transition-colors ${currentStatus.btnColor} flex items-center`}
        >
          {status !== "failed" && status !== "new_task" && (
            <input
              className={`mr-2 h-4 w-4 rounded focus:ring-0 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
              type="checkbox"
              name="checkBox"
              checked={status === "completed"}
              onChange={handleCheckboxChange}
            />
          )}
          {currentStatus.btnText}
        </button>

        {/* Progress indicator for active tasks */}
        {status === "active" && (
          <div
            className={`w-24 rounded-full h-1.5 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className={`bg-amber-500 h-1.5 rounded-full transition-all duration-500 ${
                isHovered ? "w-3/4" : "w-1/2"
              }`}
            ></div>
          </div>
        )}
      </div>

      {/* Subtle gradient background effect */}
      <div
        className={`absolute -z-10 top-0 left-0 w-full h-full opacity-10 ${
          currentStatus.bgColor
        } transition-opacity duration-300 ${isHovered ? "opacity-20" : ""}`}
      ></div>
    </div>
  );
}

export default memo(TaskListCard);
