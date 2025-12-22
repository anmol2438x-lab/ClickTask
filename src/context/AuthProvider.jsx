import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage } from "../data/localStorage";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);

  // add new employee
  const addNewEmployee = (newEmployee) => {
    setUserData({
      ...userData,
      employeesData: [...userData.employeesData, newEmployee],
    });
  };

  // add new task to employee
  const addNewTask = (id, task) => {
    setUserData({
      ...userData,
      employeesData: userData.employeesData.map((employee) =>
        employee.id === id
          ? { ...employee, tasks: [...employee.tasks, task] }
          : employee
      ),
    });
  };

  // local Storage data to auth Provider
  useEffect(() => {
    const localData = getLocalStorage();

    if (localData) {
      if (localData.adminData && localData.employeesData) {
        setUserData({
          adminData: localData.adminData,
          employeesData: localData.employeesData,
        });
      }

      if (localData.currentUser) {
        setCurrentUser(localData.currentUser);
      }

      if (localData.loggedInUser) {
        setUser(localData.loggedInUser.role);
        setLoggedInUser(localData.loggedInUser);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        theme,
        setTheme,
        loggedInUser,
        setLoggedInUser,
        currentUser,
        setCurrentUser,
        addNewEmployee,
        addNewTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const getAuthData = () => {
  return useContext(AuthContext);
};
