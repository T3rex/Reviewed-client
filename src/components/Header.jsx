import toast from "react-hot-toast";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useAuth();

  const handleLogout = async () => {
    try {
      await user.signOut();
      toast.success("You've been logged out. See you next time 👋", {
        duration: 3000,
      });
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
      <Link to={"/dashboard"}>
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          MyBrand
        </div>
      </Link>

      {user?.user ? (
        // Show dropdown if logged in
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
              <p
                onClick={handleLogout}
                className="block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      ) : (
        // Show Sign in/up if NOT logged in
        <div className="space-x-4">
          <Link to={"/signin"}>
            <button className="text-blue-600 hover:underline cursor-pointer">
              Sign in
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
