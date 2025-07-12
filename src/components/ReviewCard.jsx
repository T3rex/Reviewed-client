import React from "react";

function ReviewCard({ review }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4"
      key={review?._id}
    >
      {review?.reviewText && (
        <p className="text-gray-800 dark:text-gray-200">{review.reviewText}</p>
      )}

      {review?.videoLink && (
        <div className="w-full aspect-video rounded overflow-hidden border border-gray-300 dark:border-gray-700">
          <video
            controls
            src={review.videoLink}
            className="w-full h-full object-cover"
            title="User video review"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400">
        — {review?.reviewerName}
      </div>
    </div>
  );
}

export default ReviewCard;
