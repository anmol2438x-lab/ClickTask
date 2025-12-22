import React from "react";
import { getAuthData } from "../context";

function Footer() {
  const { theme } = getAuthData();

  return (
    <footer
      className={`mt-8 py-4 border-t ${
        theme === "dark"
          ? "border-gray-700 text-gray-400"
          : "border-gray-200 text-gray-500"
      }`}
    >
      <div className="container mx-auto px-4 text-center text-sm">
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          © {new Date().getFullYear()} All rights reserved. Developed by{" "}
          <a href="https://www.linkedin.com/in/sachinpro/" target="blank">
            <span
              className={
                theme === "dark"
                  ? "text-blue-400 font-medium"
                  : "text-blue-600 font-medium"
              }
            >
              Sachin
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
