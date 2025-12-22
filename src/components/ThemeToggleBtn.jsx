import { useEffect } from "react";
import { getAuthData } from "../context";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = getAuthData();

  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button
        onClick={handleTheme}
        className={`flex items-center justify-center p-2 rounded-full transition duration-300 
    ${
      theme === "dark"
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-gray-100 hover:bg-gray-200"
    }`}
      >
        {theme === "dark" ? (
          <FaSun size={20} className="fill-yellow-300" />
        ) : (
          <FaMoon size={20} className="fill-gray-700" />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
