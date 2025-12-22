import employees from "./employees.json";
import admin from "./admin.json";
import { generateRelativeDates } from "../helper/helperFunctions";


// set local storage data
export const setLocalStorage = () => {

 const processedEmployees = employees.map(employee => ({
    ...employee,
    tasks: generateRelativeDates(employee.tasks)
  }));

  localStorage.setItem("employees", JSON.stringify(processedEmployees));
  localStorage.setItem("admin", JSON.stringify(admin));
  localStorage.setItem("theme", 'light');

};


localStorage.getItem('employees')  ? '' : setLocalStorage(); 
localStorage.getItem('admin')  ? '' : setLocalStorage(); 



// get localStorage Data 

export function getLocalStorage () {

  const parseOrDefault = (item, defaultValue) => {
    try {
      return JSON.parse(item);
    } catch (error) {
      return defaultValue;
    }
  };


  const employeesData = parseOrDefault(localStorage.getItem("employees"), []);
  const adminData = parseOrDefault(localStorage.getItem("admin"), []) || [];
  const currentUser = parseOrDefault(localStorage.getItem("currentUser"), null);
  const loggedInUser = parseOrDefault(localStorage.getItem("loggedInUser"), null );
  const theme = parseOrDefault(localStorage.getItem("theme"), "light"); 

  return {
    employeesData,
    adminData,
    currentUser,
    loggedInUser,
    theme,
  };
};
