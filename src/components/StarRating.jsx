import { useState } from "react";
import { Star } from "lucide-react";

function StarRating() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex justify-center items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} className="cursor-pointer">
            <input
              className="hidden"
              type="radio"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <Star
              size={20}
              color="yellow"
              fill={ratingValue <= (hover || rating) ? "yellow" : ""}
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
