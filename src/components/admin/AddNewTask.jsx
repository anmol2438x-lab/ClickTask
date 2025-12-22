import React, { memo, useState } from "react";
import { getAuthData } from "../../context";
import {
  FiPlus,
  FiCalendar,
  FiUser,
  FiFileText,
  FiClipboard,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { BiCategory } from "react-icons/bi";

function AddNewTask() {
  const { userData, setUserData, theme } = getAuthData();

  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputClass =
    theme === "dark"
      ? "bg-gray-800 text-white border-2 border-gray-700 focus:ring-blue-500"
      : "bg-white text-gray-800 border-2 border-gray-300 focus:ring-blue-500";

  const [addNewTask, setAddNewTask] = useState({
    task_title: "",
    status: "new_task",
    task_date: "",
    task_description: "",
    category: "".toUpperCase(),
    employee_name: userData.employeesData?.[0]?.name || "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddNewTask((prev) => ({
      ...prev,
      [name]: value,
      id: Date.now(),
      created_at: new Date().toISOString(),
    }));
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();

    if (
      !addNewTask.task_title ||
      !addNewTask.task_date ||
      !addNewTask.task_description ||
      !addNewTask.category
    ) {
      toast.error("Please fill all required fields", {
        position: "top-center",
        style: {
          background: theme === "dark" ? "#1F2937" : "#F3F4F6",
          color: theme === "dark" ? "#F9FAFB" : "#111827",
        },
      });
      return;
    }

    const updatedTasks = userData.employeesData?.map((employee) =>
      employee.name === addNewTask.employee_name
        ? { ...employee, tasks: [addNewTask, ...employee.tasks] }
        : employee
    );

    if (updatedTasks) {
      setUserData({
        ...userData,
        employeesData: updatedTasks,
      });
      localStorage.setItem("employees", JSON.stringify(updatedTasks));

      toast.success(
        `Task assigen successfully to ${addNewTask.employee_name} !`,
        {
          position: "top-center",
          style: {
            background: theme === "dark" ? "#1F2937" : "#F3F4F6",
            color: theme === "dark" ? "#F9FAFB" : "#111827",
          },
          iconTheme: {
            primary: "#3B82F6",
            secondary: theme === "dark" ? "#1F2937" : "#F3F4F6",
          },
        }
      );

      setAddNewTask({
        task_title: "",
        status: "new_task",
        task_date: "",
        task_description: "",
        category: "",
        employee_name: userData.employeesData?.[0]?.name || "",
      });
    }
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
          <FiPlus
            className={`text-xl ${
              theme === "dark" ? " stroke-blue-400" : " stroke-blue-600"
            }`}
          />
        </div>
        <h2 className={`text-xl font-bold ${textClass}`}>Create New Task</h2>
      </div>

      <form onSubmit={handleNewTaskSubmit} className="space-y-4">
        {/* Task Title */}
        <div className="space-y-1">
          <label
            className={`block text-sm font-medium ${textClass} flex items-center`}
          >
            <FiFileText
              className={`mr-2 ${
                theme === "dark" ? "stroke-white" : "stroke-gray-800"
              }`}
            />{" "}
            Task Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="task_title"
              className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Complete project documentation"
              value={addNewTask.task_title}
              onChange={handleInput}
              autoComplete="off"
            />
            <FiFileText
              className={`absolute left-3 top-3 ${
                theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Task Description */}
        <div className="space-y-1">
          <label
            className={`block text-sm font-medium ${textClass} flex items-center`}
          >
            <FiClipboard
              className={`mr-2 ${
                theme === "dark" ? "stroke-white" : "stroke-gray-800"
              }`}
            />{" "}
            Task Description
          </label>
          <div className="relative">
            <textarea
              name="task_description"
              className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Describe the task details..."
              rows="4"
              value={addNewTask.task_description}
              onChange={handleInput}
            />
            <FiClipboard
              className={`absolute left-3 top-3 ${
                theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Assign to Employee */}
        <div className="flex justify-between gap-4">
          <div className="space-y-1 w-1/2">
            <label
              className={`block text-sm font-medium ${textClass} flex items-center`}
            >
              <FiUser
                className={`mr-2 ${
                  theme === "dark" ? "stroke-white" : "stroke-gray-800"
                }`}
              />{" "}
              Assign to
            </label>
            <div className="relative">
              <select
                name="employee_name"
                className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none`}
                value={addNewTask.employee_name}
                onChange={handleInput}
              >
                {userData.employeesData?.map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.name}
                    className={
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }
                  >
                    {employee.name}
                  </option>
                ))}
              </select>
              <FiUser
                className={`absolute left-3 top-3 ${
                  theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
                }`}
              />
            </div>
          </div>

          <div className="space-y-1 w-1/2">
            <label
              className={`block text-sm font-medium ${textClass} flex items-center`}
            >
              <BiCategory
                className={`mr-2 ${
                  theme === "dark" ? "fill-white" : "fill-gray-800"
                }`}
              />{" "}
              Category
            </label>
            <div className="relative">
              <input
                type="text"
                name="category"
                className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="What’s your task about? (3–14 chars)"
                value={addNewTask.category}
                onChange={handleInput}
                autoComplete="off"
                minLength={3}
                maxLength={14}                
              />
              <BiCategory
                className={`absolute left-3 top-3 ${
                  theme === "dark" ? "fill-gray-400" : "fill-gray-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className="space-y-1">
          <label
            className={`block text-sm font-medium ${textClass} flex items-center`}
          >
            <FiCalendar
              className={`mr-2 ${
                theme === "dark" ? "stroke-white" : "stroke-gray-800"
              }`}
            />{" "}
            Deadline
          </label>
          <div className="relative">
            <input
              name="task_date"
              type="date"
              className={`pl-10 pr-4 py-2.5 w-full rounded-lg ${inputClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === "dark"
                  ? "[&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:brightness-100 [&::-webkit-calendar-picker-indicator]:hover:brightness-125"
                  : "[&::-webkit-calendar-picker-indicator]:invert-[0.5] [&::-webkit-calendar-picker-indicator]:hover:invert-[0.7]"
              }`}
              value={addNewTask.task_date}
              onChange={handleInput}
            />
            <FiCalendar
              className={`absolute left-3 top-3 ${
                theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 flex items-center justify-center ${
            theme === "dark" ? "shadow-lg shadow-blue-500/20" : ""
          }`}
        >
          <FiPlus className="mr-2" />
          Create Task
        </button>
      </form>
    </div>
  );
}

export default memo(AddNewTask);
