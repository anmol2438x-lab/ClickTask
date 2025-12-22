import React from "react";
import Login from "./components/Auth/Login";
import {AdminDashboard, EmployeeDashboard} from './Dashboard'
import { getAuthData } from "./context";
import toast from "react-hot-toast";

function App() {
  const { userData, user, setUser, setCurrentUser, setLoggedInUser, theme } = getAuthData();

  
  // handle Login form
  const handleLogin = (email, password) => {
    if (userData) {
      const { adminData, employeesData } = userData;

      const admin = adminData.find(
        (admin) => admin.email == email && admin.password == password
      );
      if (admin) {
        setCurrentUser(admin);
        setUser("admin");
        setLoggedInUser({ role: "admin" });

        localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
        localStorage.setItem("currentUser", JSON.stringify(admin));
        return;
      }

      const employee = employeesData.find(
        (employee) => employee.email == email && employee.password == password
      );
      if (employee) {
        setCurrentUser(employee);
        setUser("employee");
        setLoggedInUser({ role: "employee" });

        localStorage.setItem("currentUser", JSON.stringify(employee));
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee" })
        );
        return;
      }

      toast.error("Please enter vailid info", {
        position: "top-center",
        style: {
          background: theme === "dark" ? "#1F2937" : "#F3F4F6",
          color: theme === "dark" ? "#F9FAFB" : "#111827",
        },
      });
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === "admin" && <AdminDashboard />}
      {user === "employee" && <EmployeeDashboard />}
    </>
  );
}

export default App;
