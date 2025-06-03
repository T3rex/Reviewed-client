import React from "react";
import { X } from "lucide-react";

function SuccessModal({ setshowSucessModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 sm:mx-0 p-6 sm:p-10">
        {/* Close Button */}
        <button
          onClick={() => setshowSucessModal(false)}
          className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-5">
          <img
            src="https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif"
            alt="Celebration GIF"
            className="w-60 sm:w-72 rounded-lg border border-gray-300 dark:border-gray-700"
          />

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Campaign Created Successfully! 🎉
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Share the link with your customers and start collecting
            testimonials.
          </p>

          <button
            onClick={() => setshowSucessModal(false)}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
