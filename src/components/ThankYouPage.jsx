import { ToggleSwitch } from "flowbite-react";
import { useFormContext } from "react-hook-form";

function ThankYouPage() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("thankImageUrl", imageUrl);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          Customize Thank You Page
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Add your personalized message to show your appreciation
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 space-y-6 border border-gray-100 dark:border-gray-800">
        {/* Logo Upload */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <img
            src={watch("thankImageUrl")}
            alt="Profile"
            className="w-30 h-20 rounded-xl  cursor-pointer border-2 border-gray-300 dark:border-gray-600"
          />
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-300">
                Add Image
              </label>
              {/* <label className="text-sm text-gray-500 font-medium">
                Hide the image?
              </label>
              <input type="checkbox" checked={true} className="ml-1" /> */}
            </div>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-white text-sm file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:cursor-pointer hover:file:bg-primary-800 dark:file:bg-primary-700 dark:file:text-white hover:file:cursor-pointer"
              {...register("file")}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </div>
        </div>

        {/* Thank You Title */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Thank you title
          </label>
          <input
            type="text"
            placeholder="Thank you!"
            className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            {...register("thankTitle")}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Thank you message
          </label>
          <textarea
            rows="4"
            placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏"
            className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            {...register("thankMessage")}
          />
          <p className="text-xs text-gray-500 mt-1">Markdown supported</p>
        </div>

        {/* Toggle */}
        <div className="w-full sm:w-1/2">
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Allow sharing on social media
          </label>
          <ToggleSwitch
            {...register("allowSMShare")}
            checked={watch("allowSMShare")}
            onChange={() => setValue("allowSMShare", !watch("allowSMShare"))}
          />
        </div>

        {/* Redirect Link */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Redirect to your own page
          </label>
          <input
            type="text"
            placeholder="https://example.com"
            className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            {...register("redirectUrl")}
          />
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
