import { useFormContext } from "react-hook-form";
import socialLinks from "../assets/socialLinks.png";
function ThankPreview() {
  const { watch } = useFormContext();
  const allowSMShare = watch("allowSMShare");

  return (
    <div className="sticky top-0 w-full sm:w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 flex flex-col items-center text-center transition-all duration-500 ease-in-out transform animate-fade-in">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors">
        Live Preview - Thank You Page
      </h2>

      <img
        src={watch("thankImageUrl") || "/default-logo.png"}
        alt="Campaign Logo"
        className="w-full rounded-lg object-cover mb-4 border-2 border-gray-300 dark:border-gray-600 transition-all duration-300"
      />

      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 break-words transition-all">
        {watch("thankTitle") || "Thank you!"}
      </h3>

      <p className="text-md sm:text-base text-gray-600 dark:text-gray-300 mb-4 break-words w-full transition-all">
        {watch("thankMessage") ||
          "Thank you so much for your shoutout! It means a ton for us! 🙏"}
      </p>
      {allowSMShare && <img alt="Social links" src={socialLinks} />}
    </div>
  );
}

export default ThankPreview;
