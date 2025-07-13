import { useState } from "react";
import { Star } from "lucide-react";

function StarRating({ rating, setRating, mode = "edit" }) {
  const [hover, setHover] = useState(0);
  const isEditable = mode === "edit";

  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        const isActive = ratingValue <= (hover || rating);

        const handleClick = () => {
          if (isEditable && setRating) setRating(ratingValue);
        };

        return (
          <label
            key={i}
            className={`cursor-pointer transition-transform duration-200 ${
              isEditable ? "hover:scale-110" : ""
            }`}
          >
            <input
              type="radio"
              value={ratingValue}
              className="hidden"
              onClick={handleClick}
              readOnly
            />
            <Star
              size={isEditable ? 28 : 20}
              className={`transition-colors duration-200 ${
                isActive ? "text-yellow-400" : "text-gray-400"
              }`}
              fill={isActive ? "yellow" : "gray"}
              onMouseEnter={() => isEditable && setHover(ratingValue)}
              onMouseLeave={() => isEditable && setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
