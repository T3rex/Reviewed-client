import { useState } from "react";
import { Star } from "lucide-react";

function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        const isActive = ratingValue <= (hover || rating);

        return (
          <label
            key={i}
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            <input
              type="radio"
              value={ratingValue}
              className="hidden"
              onClick={() => setRating(ratingValue)}
            />
            <Star
              size={28}
              className={`transition-colors duration-200 ${
                isActive ? "text-yellow-400" : "text-gray-400"
              }`}
              fill={isActive ? "yellow" : "gray"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
