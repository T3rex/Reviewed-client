import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsLoggedIn(false);
        console.log("User logged out successfully");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b-2 dark:bg-gray-800 px-6 py-4 shadow flex items-center justify-between">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        MyBrand
      </div>
      {/* Show only if logged in */}
      <div className="relative" ref={dropdownRef}>
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-50">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Settings
            </a>
            <a
              onClick={() => handleLogout()}
              href="#"
              className="block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
