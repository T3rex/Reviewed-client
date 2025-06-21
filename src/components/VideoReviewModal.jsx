import React from "react";
import { X } from "lucide-react";
import StarRating from "./StarRating";

function VideoReviewModal({ setShowVideoReviewModal, formConfig }) {
  const handleClose = () => setShowVideoReviewModal(false);
  const handleSubmit = () => console.log("Submit");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overflow-y-auto">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl mt-100 shadow-2xl w-full max-w-lg mx-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-600 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col gap-6 mt-2">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-semibold">
              Check Your Camera and Microphone
            </h1>
            <p className="text-gray-500 px-2 text-balance">
              You have up to 180 seconds to record your video. Don't worry: You
              can review your video before submitting it, and you can re-record
              if needed.
            </p>
          </div>
          {formConfig.collectionType === "Video only" && (
            <>
              <div>
                <h2 className="text-lg font-bold mb-2">Questions</h2>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  {formConfig.questions.map((q) => (
                    <li key={q.id}>{q.question}</li>
                  ))}
                </ul>
              </div>

              {formConfig.collectStars && <StarRating />}

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={50}
                  />
                </div>
                {/* Email */}
                {formConfig.extraInfo.email.enabled && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Email{" "}
                      {formConfig.extraInfo.email.required && (
                        <span className="text-orange-500">*</span>
                      )}
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={50}
                    />
                  </div>
                )}
                {/* Social Link */}
                {formConfig.extraInfo.socialLink.enabled && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Social Link{" "}
                      {formConfig.extraInfo.socialLink.required && (
                        <span className="text-orange-500">*</span>
                      )}
                    </label>
                    <input
                      type="url"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={50}
                    />
                  </div>
                )}
                {formConfig.extraInfo.title.enabled && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Title{" "}
                      {formConfig.extraInfo.title.required && (
                        <span className="text-orange-500">*</span>
                      )}
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={50}
                    />
                  </div>
                )}
              </div>

              {/* Permission */}
              <div className="flex items-start gap-3 text-sm ">
                <input type="checkbox" className="mt-1" />
                <label>
                  I give permission to use this testimonial across social
                  channels and other marketing efforts
                </label>
              </div>
            </>
          )}
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-2 rounded-md border cursor-pointer border-gray-300 text-gray-600 bg-white hover:bg-red-500 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 rounded-md cursor-pointer bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoReviewModal;
