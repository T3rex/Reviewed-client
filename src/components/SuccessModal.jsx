import axios from "axios";
import { X, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SuccessModal({
  setshowSucessModal,
  setshowCampaignModal,
  submissionLink,
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(submissionLink);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  const handleClose = () => {
    setshowSucessModal(false);
    setshowCampaignModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 sm:mx-0 p-6 sm:p-10">
        {/* Close Button (top right) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-5">
          <img
            src="https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif"
            alt="Celebration"
            className="w-60 sm:w-72 rounded-lg dark:border-gray-700"
          />

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Campaign Created Successfully! 🎉
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Share this link with your customers to collect testimonials:
          </p>

          {/* Copyable Link Input */}
          <div className="w-full flex items-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
            <input
              type="text"
              value={submissionLink}
              readOnly
              className="w-full p-2 text-sm text-gray-700 dark:text-white bg-transparent outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Copy Link
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-5 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
