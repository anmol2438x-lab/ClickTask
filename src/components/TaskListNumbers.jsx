import React, { memo, useEffect, useState } from "react";
import { getAuthData } from "../context";
import {
  FiLayers,
  FiCheckSquare,
  FiActivity,
  FiAlertTriangle,
  FiUserPlus,
} from "react-icons/fi";

function TaskListNumbers() {
  const { currentUser, userData, user, theme } = getAuthData();
  const totalTasks = userData?.employeesData
    ?.map((employee) => employee.tasks)
    .flat(Infinity);

  const [taskStats, setTaskStats] = useState({
    totalOrNew: 0,
    completed: 0,
    progressOrAccepted: 0,
    failed: 0,
    employees: 0,
  });

  useEffect(() => {
    if (!totalTasks) return;

    if (user === "admin") {
      setTaskStats({
        totalOrNew: totalTasks.length,
        completed: totalTasks.filter((task) => task.status === "completed")
          .length,
        progressOrAccepted: totalTasks.filter((task) =>
          ["new_task", "active"].includes(task.status)
        ).length,
        failed: totalTasks.filter((task) => task.status === "failed").length,
        employees: userData?.employeesData?.length || 0,
      });
    } else if (user === "employee" && currentUser?.tasks) {
      setTaskStats({
        totalOrNew: currentUser.tasks.filter(
          (task) => task.status === "new_task"
        ).length,
        completed: currentUser.tasks.filter(
          (task) => task.status === "completed"
        ).length,
        progressOrAccepted: currentUser.tasks.filter(
          (task) => task.status === "active"
        ).length,
        failed: currentUser.tasks.filter((task) => task.status === "failed")
          .length,
        employees: 0,
      });
    }
  }, [userData, user, currentUser?.tasks]);

  // Theme-based styles
  const cardBg =
    theme === "dark"
      ? "bg-gray-800/80 hover:bg-gray-800"
      : "bg-white hover:bg-gray-50";

  const cardBorder =
    theme === "dark" ? "border-gray-700/50" : "border-gray-200";

  const textMuted = theme === "dark" ? "text-gray-400" : "text-gray-500";

  const cardsData = [
    {
      id: "employees",
      title: "Total Employees",
      value: taskStats.employees,
      icon: FiUserPlus,
      colors: {
        text: theme === "dark" ? "text-indigo-400" : "text-indigo-600",
        bg: theme === "dark" ? "bg-indigo-900/20" : "bg-indigo-100/80",
        accent: theme === "dark" 
          ? "from-indigo-900/40 to-indigo-900/0" 
          : "from-indigo-100 to-indigo-50",
        icon: theme === "dark" ? "stroke-indigo-400" : "stroke-indigo-600",
      },
      show: user === "admin",
    },
    {
      id: "totalOrNew",
      title: user === "admin" ? "Total Tasks" : "New Tasks",
      value: taskStats.totalOrNew,
      icon: FiLayers,
      colors: {
        text: theme === "dark" ? "text-blue-400" : "text-blue-600",
        bg: theme === "dark" ? "bg-blue-900/20" : "bg-blue-100/80",
        accent: theme === "dark" 
          ? "from-blue-900/40 to-blue-900/0" 
          : "from-blue-100 to-blue-50",
        icon: theme === "dark" ? "stroke-blue-400" : "stroke-blue-600",
      },
      show: true,
    },
    {
      id: "completed",
      title: "Completed",
      value: taskStats.completed,
      icon: FiCheckSquare,
      colors: {
        text: theme === "dark" ? "text-emerald-400" : "text-emerald-600",
        bg: theme === "dark" ? "bg-emerald-900/20" : "bg-emerald-100/80",
        accent: theme === "dark" 
          ? "from-emerald-900/40 to-emerald-900/0" 
          : "from-emerald-100 to-emerald-50",
        icon: theme === "dark" ? "stroke-emerald-400" : "stroke-emerald-600",
      },
      show: true,
    },
    {
      id: "progressOrAccepted",
      title: user === "admin" ? "In Progress" : "Accepted",
      value: taskStats.progressOrAccepted,
      icon: FiActivity,
      colors: {
        text: theme === "dark" ? "text-amber-400" : "text-amber-600",
        bg: theme === "dark" ? "bg-amber-900/20" : "bg-amber-100/80",
        accent: theme === "dark" 
          ? "from-amber-900/40 to-amber-900/0" 
          : "from-amber-100 to-amber-50",
        icon: theme === "dark" ? "stroke-amber-400" : "stroke-amber-600",
      },
      show: true,
    },
    {
      id: "failed",
      title: "Failed",
      value: taskStats.failed,
      icon: FiAlertTriangle,
      colors: {
        text: theme === "dark" ? "text-rose-400" : "text-rose-600",
        bg: theme === "dark" ? "bg-rose-900/20" : "bg-rose-100/80",
        accent: theme === "dark" 
          ? "from-rose-900/40 to-rose-900/0" 
          : "from-rose-100 to-rose-50",
        icon: theme === "dark" ? "stroke-rose-400" : "stroke-rose-600",
      },
      show: true,
    },
  ];

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-4 mb-8 px-2 sm:px-4">
      {cardsData.map((card) => {
        if (!card.show) return null;
        
        return (
          <div
            key={card.id}
            className={`relative p-5 rounded-xl border ${cardBg} ${cardBorder} transition-all duration-300 group overflow-hidden min-w-[190px] flex-1 max-w-[260px]`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${card.colors.accent}`}
            ></div>
            <div className="relative z-10 flex items-start justify-between h-full">
              <div className="flex flex-col justify-between h-full">
                <h3 className={`text-sm font-medium ${textMuted} mb-1`}>
                  {card.title}
                </h3>
                <p className={`text-2xl font-semibold ${card.colors.text}`}>
                  {card.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${card.colors.bg} flex items-center justify-center`}>
                <card.icon className={`text-xl ${card.colors.icon}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(TaskListNumbers);