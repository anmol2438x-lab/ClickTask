import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FiAlertCircle, FiCheckCircle, FiChevronDown, FiChevronUp, FiClock, FiInfo } from "react-icons/fi";

function EmployeeTaskCardList({ task, textClass, theme, i, expandedTask, setExpandedTask }) {
  

  const getStatusConfig = (status) => {
    const baseConfig = {
      icon: <FiInfo className="mr-2" />,
      color: "",
      bg: "",
      textColor: "",
    };

    switch (status) {
      case "completed":
        return {
          ...baseConfig,
          icon: <FiCheckCircle className="mr-2 stroke-emerald-500" />,
          color: theme === "dark" ? "bg-emerald-900/20" : "bg-emerald-100/50",
          textColor: theme === "dark" ? "text-emerald-400" : "text-emerald-600",
          bgColor: theme === "dark" ? "bg-emerald-900/10" : "bg-emerald-50",
        };
      case "new_task":
        return {
          ...baseConfig,
          icon: <FiClock className="mr-2 stroke-blue-500" />,
          color: theme === "dark" ? "bg-blue-900/20" : "bg-blue-100/50",
          textColor: theme === "dark" ? "text-blue-400" : "text-blue-600",
          bgColor: theme === "dark" ? "bg-blue-900/10" : "bg-blue-50",
        };
      case "failed":
        return {
          ...baseConfig,
          icon: <FiAlertCircle className="mr-2 stroke-rose-500" />,
          color: theme === "dark" ? "bg-rose-900/20" : "bg-rose-100/50",
          textColor: theme === "dark" ? "text-rose-400" : "text-rose-600",
          bgColor: theme === "dark" ? "bg-rose-900/10" : "bg-rose-50",
        };
      case "active":
        return {
          ...baseConfig,
          icon: <FiClock className="mr-2 stroke-amber-500" />,
          color: theme === "dark" ? "bg-amber-900/20" : "bg-amber-100/50",
          textColor: theme === "dark" ? "text-amber-400" : "text-amber-600",
          bgColor: theme === "dark" ? "bg-amber-900/10" : "bg-amber-50",
        };
      default:
        return {
          ...baseConfig,
          icon: <FiInfo className="mr-2 stroke-gray-500" />,
          color: theme === "dark" ? "bg-gray-700/50" : "bg-gray-100/50",
          textColor: theme === "dark" ? "text-gray-300" : "text-gray-600",
          bgColor: theme === "dark" ? "bg-gray-700/10" : "bg-gray-50",
        };
    }
  };

  const toggleTaskExpansion = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const statusConfig = getStatusConfig(task.status);
  const isExpanded = expandedTask === i;

  return (
    <>
      <tr
        className={`${
          theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
        } transition-colors duration-150 cursor-pointer`}
        onClick={() => toggleTaskExpansion(i)}
      >
        <td className={`p-4 text-sm ${textClass}`}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-200"
              } mr-3`}
            >
              <span className={`text-xs font-medium ${textClass}`}>
                {task.employee_name
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .join("")}
              </span>
            </div>
            <span className={`truncate max-w-[120px] ${textClass}`}>
              {task.employee_name}
            </span>
          </div>
        </td>
        <td className={`p-4 text-sm ${textClass}`}>
          <div className={`truncate max-w-[180px] font-medium ${textClass}`}>
            {task.task_title}
          </div>
        </td>
        <td className="p-4">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color} ${statusConfig.textColor}`}
          >
            {statusConfig.icon}
            {task.status.replace("_", " ")}
          </div>
        </td>
        <td className={`p-4 text-sm ${textClass}`}>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-lg ${
              new Date(task.task_date) < new Date() &&
              task.status !== "completed"
                ? theme === "dark"
                  ? "bg-rose-900/20 text-rose-400"
                  : "bg-rose-100/50 text-rose-600"
                : theme === "dark"
                ? "bg-gray-700/50 text-gray-300"
                : "bg-gray-100/50 text-gray-600"
            }`}
          >
            {task.task_date
              ? new Date(task.task_date).toLocaleDateString()
              : "-"}
          </div>
        </td>
        <td className="p-4 text-sm">
          <button
            className={`p-1 rounded-full ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleTaskExpansion(i);
            }}
          >
            {isExpanded ? (
              <FiChevronUp
                className={
                  theme === "dark" ? "stroke-gray-300" : "stroke-gray-700"
                }
              />
            ) : (
              <FiChevronDown
                className={
                  theme === "dark" ? "stroke-gray-300" : "stroke-gray-700"
                }
              />
            )}
          </button>
        </td>
      </tr>

      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0 }}
            className={`${statusConfig.bgColor}`}
          >
            <td colSpan="5" className="p-4">
              <div className="pl-16 pr-4">
                <h3 className={`text-sm font-medium mb-2 ${textClass}`}>
                  {task.task_title}
                </h3>
                <p
                  className={`text-sm mb-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {task.task_description || "No description provided"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <div
                    className={`px-3 py-1 rounded-lg text-xs ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Assigned: {new Date(task.created_at).toLocaleDateString()}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-lg text-xs ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Employee ID: {task.employee_id}
                  </div>
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default EmployeeTaskCardList;
