import React from "react";
import {Header, TaskList, TaskListNumbers, Footer} from '../components'
import { getAuthData } from "../context";



const EmployeeDashboard = () => {
  const {theme} = getAuthData()


  // Theme classes
  const themeClasses = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800";
  const textClass = theme === "dark" ? "text-white" : "text-gray-800";


  return (
    <div className={`min-h-screen p-6 ${themeClasses} `}>
      {/* Header */}
      <Header textClass={textClass}/>

      {/* Task Statistics */}
      <TaskListNumbers />

      {/* New Tasks List */}
      <TaskList textClass={textClass} />

      <Footer />

    </div>
  );
};

export default EmployeeDashboard;
