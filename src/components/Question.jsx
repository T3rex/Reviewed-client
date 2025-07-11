import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function Question({
  maxLength = 100,
  id,
  questions,
  setQuestions,
  defaultValue,
  placeholder = "Keep it short!",
}) {
  const [value, setValue] = useState(defaultValue);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      const index = newQuestions.findIndex((q) => q.id === id);
      newQuestions[index] = { id, question: value };
      return newQuestions;
    });
  }, [value]);

  const handleOnClick = () => {
    setValue("");
    setQuestions((prev) => {
      const newQuestions = prev.filter((q) => q.id !== id);
      return newQuestions;
    });
    setShow(false);
  };

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } flex flex-row justify-center align-middle items-center gap-3 mb-5`}
    >
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pr-16 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
          {value.length}/{maxLength}
        </span>
      </div>
      <Trash2
        className=" text-white hover:cursor-pointer hover:text-red-500 dark:hover:text-red-400"
        size={30}
        onClick={handleOnClick}
      />
    </div>
  );
}
