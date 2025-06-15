import { Video, PencilLine } from "lucide-react";
import { useFormContext } from "react-hook-form";
import StarRating from "./StarRating";

function Preview({ questions }) {
  const { watch } = useFormContext();
  const collectionType = watch("collectionType");
  const collectStars = watch("collectStars");

  return (
    <div className="sticky top-0 w-full sm:w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 flex flex-col items-center text-center transition-all duration-500 ease-in-out transform animate-fade-in">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors">
        Live Preview - Testimonial Page
      </h2>

      <img
        src={watch("campaignLogo") || "/default-logo.png"}
        alt="Campaign Logo"
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300 dark:border-gray-600 transition-all duration-300"
      />

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 break-words transition-all">
        {watch("headerTitle") || "Header goes here..."}
      </h3>

      <p className="text-md sm:text-base text-gray-600 dark:text-gray-300 mb-4 break-words w-full transition-all">
        {watch("customMessage") || "Your custom message goes here..."}
      </p>

      {collectStars && (
        <div className="transition-all duration-300">
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
            Rate us
          </p>
          <StarRating />
        </div>
      )}

      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Questions
      </h4>

      <ul className="text-left list-disc list-inside text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 w-full">
        {questions.map((q) => (
          <li
            key={q?.id}
            className="break-words whitespace-pre-wrap p-1 transition-all"
          >
            {q?.question}
          </li>
        ))}
      </ul>

      {(collectionType === "Video only" ||
        collectionType === "Text and Video") && (
        <button className="w-full my-5 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300">
          <Video className="inline w-5 mr-2" color="white" />
          Record Video
        </button>
      )}

      {(collectionType === "Text only" ||
        collectionType === "Text and Video") && (
        <button className="w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300">
          <PencilLine className="inline w-5 mr-2" color="white" />
          Send in Text
        </button>
      )}
    </div>
  );
}

export default Preview;
