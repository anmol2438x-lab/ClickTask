import React, { memo, useState } from "react";
import { TaskListCard } from "./index";
import { getAuthData } from "../context";
import { FiPlus, FiFilter } from "react-icons/fi";

function TaskList({ textClass }) {
  const { currentUser, theme } = getAuthData();
  const [activeFilter, setActiveFilter] = useState("all");

  // Available task filters
  const filters = [
    { value: "all", label: "All" },
    { value: "new_task", label: "New" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" }
  ];

  const filteredTasks = currentUser?.tasks?.filter(task => {
    if (activeFilter === "all") return true;
    return task.status === activeFilter;
  }) || [];

  // Determine theme classes
  const themeClasses = {
    container: theme === "dark" 
      ? "bg-gray-800 shadow-gray-900/50" 
      : "bg-white shadow-md",
    text: theme === "dark" ? "text-white" : "text-gray-800",
    secondaryText: theme === "dark" ? "text-gray-400 stroke-gray-400" : "text-gray-500 stroke-gray-500",
    filterBar: theme === "dark" ? "bg-gray-700" : "bg-gray-100",
    filterButton: {
      active: theme === "dark" 
        ? "bg-gray-600 text-white" 
        : "bg-white text-gray-800",
      inactive: theme === "dark" 
        ? "text-gray-400 hover:text-gray-300" 
        : "text-gray-500 hover:text-gray-700"
    },
    emptyState: {
      iconBg: theme === "dark" ? "bg-gray-700" : "bg-gray-100",
      icon: theme === "dark" ? "stroke-gray-500" : "stroke-gray-400",
      text: theme === "dark" ? "text-gray-400" : "text-gray-500"
    },
    gradient: theme === "dark" ? "from-gray-800" : "from-white"
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg transition-colors duration-200 ${themeClasses.container}`}>
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${textClass || themeClasses.text}`}>
            Task Dashboard
          </h2>
          <p className={`text-sm mt-1 ${themeClasses.secondaryText}`}>
            {filteredTasks.length} of {currentUser?.tasks?.length || 0} tasks shown
          </p>
        </div>

        {/* Status filters */}
        <div className="relative">
          <div className={`flex items-center space-x-2 p-1 rounded-lg ${themeClasses.filterBar}`}>
            <FiFilter className={`ml-2 ${themeClasses.secondaryText}`} />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeFilter === filter.value
                    ? `${themeClasses.filterButton.active} shadow-sm`
                    : themeClasses.filterButton.inactive
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task list container */}
      <div className="relative">

        {/* Task cards */}
        <div
          id="taskList"
          className="py-2 flex items-stretch gap-5 overflow-x-auto scrollbar-hide pb-6 px-2"
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, i) => (
              <div key={`${task.id}-${i}`} className="flex-shrink-0 w-72">
                <TaskListCard task={task} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-12 text-center">
              <div className={`p-4 mb-4 rounded-full ${themeClasses.emptyState.iconBg}`}>
                <FiPlus className={`text-xl ${themeClasses.emptyState.icon}`} />
              </div>
              <h3 className={`text-lg font-medium ${themeClasses.emptyState.text}`}>
                No tasks match your filter
              </h3>
              <p className={`text-sm mt-1 ${themeClasses.emptyState.text}`}>
                {activeFilter === "all" 
                  ? "You don't have any tasks yet" 
                  : `No ${filters.find(f => f.value === activeFilter)?.label.toLowerCase()} tasks`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TaskList);