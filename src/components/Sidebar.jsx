import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

function Sidebar({ filter, setFilter }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64 p-6" : "w-12 p-0"
      } mb-0 sticky bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm transition-all duration-300 overflow-hidden`}
    >
      {/* Sidebar toggle button (only visible when closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 transition-all duration-300  dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none p-4"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar content (only visible when open) */}
      {
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } transition-all duration-300 `}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {location.pathname.startsWith("/dashboard")
                ? "My Dashboard"
                : "My Campaign"}
            </h2>
            <X
              className="cursor-pointer text-gray-600 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          {location.pathname.startsWith("/dashboard") ? (
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Overview
              </a>
              <a
                href="#"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Campaigns
              </a>
              <a
                href="#"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Testimonials
              </a>
              <a
                href="#"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Settings
              </a>
            </nav>
          ) : (
            <nav className="space-y-2 w-full">
              {[
                { label: "All" },
                { label: "Video" },
                { label: "Text" },
                { label: "Approved" },
                { label: "Unapproved" },
              ].map(({ label }) => (
                <button
                  key={label}
                  onClick={() => setFilter(label.toLowerCase())}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all
                    cursor-pointer focus:outline-none
                    ${
                      filter === label.toLowerCase()
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:font-semibold"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </nav>
          )}
        </div>
      }
    </aside>
  );
}

export default Sidebar;
