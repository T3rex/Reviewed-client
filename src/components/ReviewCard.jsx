import React from "react";

function ReviewCard({ review }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2"
      key={review?._id}
    >
      {review?.reviewText && <p>{review.reviewText}</p>}
      {review?.videoLink && <video controls src={review.videoLink} />}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        — {review?.reviewerName}
      </div>
    </div>
  );
}

export default ReviewCard;
