import React, { memo, useState, useMemo } from "react";
import { getAuthData } from "../context";
import {
  FiUser,
  FiFilter,
  FiSearch,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import EmployeeTaskCardList from "./admin/EmployeeTaskCardList";
import { generateRelativeDates } from "../helper/helperFunctions";

function AdminEmployeeTaskStatus({ styleClass }) {
  const { textClass } = styleClass;
  const { userData, theme } = getAuthData();

  // State for filters
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);

  // Memoize the total tasks to avoid unnecessary recalculations
  const totalTasks = useMemo(() => {
    const allTasks =
      userData?.employeesData?.flatMap((employee) =>
        employee.tasks.map((task) => ({
          ...task,
          employee_name: employee.name,
          employee_id: employee.id,
        }))
    );

    const sortedTasks = allTasks.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return sortedTasks || [];
  }, [userData?.employeesData]);

  

  // Filter tasks based on filters and search
  const filteredTasks = useMemo(() => {
    return totalTasks.filter((task) => {
      const matchesEmployee =
        employeeFilter === "" ||
        task.employee_name.toLowerCase().includes(employeeFilter.toLowerCase());
      const matchesStatus = statusFilter === "" || task.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        task.task_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.task_description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesEmployee && matchesStatus && matchesSearch;
    });
  }, [totalTasks, employeeFilter, statusFilter, searchQuery]);

  // Get unique employees and statuses for filter dropdowns
  const uniqueEmployees = useMemo(
    () => [...new Set(totalTasks.map((task) => task.employee_name))],
    [totalTasks]
  );56  

  const uniqueStatuses = useMemo(
    () => [...new Set(totalTasks.map((task) => task.status))],
    [totalTasks]
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const currentTasks = useMemo(() => {
    const lastIndex = currentPage * tasksPerPage;
    const firstIndex = lastIndex - tasksPerPage;
    return filteredTasks.slice(firstIndex, lastIndex);
  }, [filteredTasks, currentPage, tasksPerPage]);

  const clearFilters = () => {
    setEmployeeFilter("");
    setStatusFilter("");
    setSearchQuery("");
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <div
      className={`rounded-xl shadow-sm border ${
        theme === "dark"
          ? "bg-gray-800/80 border-gray-700"
          : "bg-white border-gray-200"
      } mb-8 transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center">
            <div
              className={`p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-900/30 text-blue-400"
                  : "bg-blue-100 text-blue-600"
              } mr-3`}
            >
              <FiUser
                className={`text-xl ${
                  theme === "dark" ? "stroke-blue-400" : "stroke-blue-600"
                }`}
              />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${textClass}`}>
                Employee Task Status
              </h2>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {filteredTasks.length} of {totalTasks.length} tasks shown
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div
              className={`relative flex-1 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              } rounded-lg`}
            >
              <FiSearch
                className={`absolute left-3 top-3 ${
                  theme === "dark" ? "stroke-gray-400" : "stroke-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className={`pl-10 pr-4 py-2 w-full rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-800 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  <FiX
                    className={`${
                      theme === "dark" ? "stroke-gray-300" : "stroke-gray-600"
                    }`}
                  />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                } transition-colors`}
              >
                <FiFilter
                  className={`mr-2 ${
                    theme === "dark" ? "stroke-gray-300" : "stroke-gray-600"
                  }`}
                />
                Filters
                {showFilters ? (
                  <FiChevronUp
                    className={`ml-2 ${
                      theme === "dark" ? "stroke-gray-300" : "stroke-gray-600"
                    }`}
                  />
                ) : (
                  <FiChevronDown
                    className={`ml-2 ${
                      theme === "dark" ? "stroke-gray-300" : "stroke-gray-600"
                    }`}
                  />
                )}
              </button>

              {(employeeFilter || statusFilter || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className={`px-3 py-2 rounded-lg flex items-center ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } ml-2`}
                >
                  <FiX
                    className={`mr-1 ${
                      theme === "dark" ? "stroke-gray-300" : "stroke-gray-600"
                    }`}
                  />{" "}
                  Clear
                </button>
              )}
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-2 p-2">
                    <select
                      value={employeeFilter}
                      onChange={(e) => {
                        setEmployeeFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 rounded-lg flex-1 ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-800"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option
                        className={`${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                        value=""
                      >
                        All Employees
                      </option>
                      {uniqueEmployees.map((employee, index) => (
                        <option
                          className={`${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                          key={index}
                          value={employee}
                        >
                          {employee}
                        </option>
                      ))}
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 rounded-lg flex-1 ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-800"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option
                        className={`${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                        value=""
                      >
                        All Statuses
                      </option>
                      {uniqueStatuses.map((status, index) => (
                        <option
                          className={`${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                          key={index}
                          value={status}
                        >
                          {status.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <tr>
                <th
                  className={`p-4 text-left text-sm font-medium ${textClass} rounded-tl-lg`}
                >
                  Employee
                </th>
                <th
                  className={`p-4 text-left text-sm font-medium ${textClass}`}
                >
                  Task
                </th>
                <th
                  className={`p-4 text-left text-sm font-medium ${textClass}`}
                >
                  Status
                </th>
                <th
                  className={`p-4 text-left text-sm font-medium ${textClass}`}
                >
                  Deadline
                </th>
                <th
                  className={`p-4 text-left text-sm font-medium ${textClass} rounded-tr-lg`}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentTasks.length > 0 ? (
                currentTasks.map((task, i) => (
                  <EmployeeTaskCardList
                    key={`${task.id}-${i}`}
                    task={task}
                    textClass={textClass}
                    theme={theme}
                    i={i}
                    expandedTask={expandedTask}
                    setExpandedTask={setExpandedTask}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col items-center ${textClass}`}
                    >
                      <FiSearch className="text-3xl mb-3 opacity-50" />
                      <h3 className="font-medium mb-1">No tasks found</h3>
                      <p className="text-sm opacity-75">
                        {employeeFilter || statusFilter || searchQuery
                          ? "Try adjusting your filters"
                          : "No tasks available"}
                      </p>
                      {(employeeFilter || statusFilter || searchQuery) && (
                        <button
                          onClick={clearFilters}
                          className={`mt-3 px-4 py-2 rounded-lg flex items-center ${
                            theme === "dark"
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                          } text-sm font-medium`}
                        >
                          <FiX
                            className={`mr-1 ${
                              theme === "dark"
                                ? "stroke-white"
                                : "stroke-blue-600"
                            }`}
                          />{" "}
                          Clear all filters
                        </button>
                      )}
                    </motion.div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredTasks.length > tasksPerPage && (
          <div
            className={`mt-4 flex flex-col sm:flex-row justify-between items-center text-sm `}
          >
            <div
              className={`mb-2 sm:mb-0 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Showing {(currentPage - 1) * tasksPerPage + 1} to{" "}
              {Math.min(currentPage * tasksPerPage, filteredTasks.length)} of{" "}
              {filteredTasks.length} tasks
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-400 disabled:opacity-50"
                    : "hover:bg-gray-100 text-gray-500 disabled:opacity-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-400 disabled:opacity-50"
                    : "hover:bg-gray-100 text-gray-500 disabled:opacity-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(AdminEmployeeTaskStatus);
