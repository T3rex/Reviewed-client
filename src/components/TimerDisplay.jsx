import { memo } from "react";

const TimerDisplay = memo(({ timer }) => {
  return (
    <div className="text-2xl font-semibold text-center text-gray-800">
      {Math.floor(timer / 60).toString()}:
      {(timer % 60).toString().padStart(2, "0")}
    </div>
  );
});

export default TimerDisplay;
