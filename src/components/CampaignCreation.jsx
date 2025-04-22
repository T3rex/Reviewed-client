import { useEffect, useState } from "react";
import Question from "./Question";
import { CirclePlus } from "lucide-react";
import ModifiedDropdown from "./ModifiedDropdown";
import { Dropdown, DropdownItem, ToggleSwitch } from "flowbite-react";
import { useForm } from "react-hook-form";

const defaultQuestions = [
  "Who are you / what are you working on?",
  "How has [our product/service] helped you?",
  "What is the best thing about [our product/service]?",
];

function CampaignCreation() {
  const [questions, setQuestions] = useState(defaultQuestions);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaignName: "",
      headerTitle: "",
      customMessage: "",
      imgSrc: "https://i.pravatar.cc/40",
      collectStars: true,
      file: null,
      collectionType: "Select Type",
    },
  });

  const onSubmit = (data) => {
    data["questions"] = questions;
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("imgSrc", imageUrl);
    }
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions((prev) => [...prev, ""]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          Create a New Campaign
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          A dedicated testimonial collection page will be generated after
          creation.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-800 space-y-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Campaign Name */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Campaign name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Product Feedback"
              className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
              required
              {...register("campaignName", { required: true })}
            />
            <p className="text-sm text-gray-500 mt-1">
              Public URL:{" "}
              <span className="font-semibold">reviewed.com/your-campaign</span>
            </p>
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <img
              alt="Logo"
              className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600"
              src={watch("imgSrc")}
            />
            <div className="w-full space-y-2">
              <div className="flex items-center gap-3">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Campaign logo <span className="text-orange-500">*</span>
                </label>
                {/* <label className="text-sm text-gray-500 font-medium">
                  Default
                </label>
                <input
                  type="checkbox"
                  checked={defaultImage}
                  onChange={() => handelDefaultCheckbox()}
                  className="ml-1"
                  {...register("defaultLogo")}
                /> */}
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

          {/* Header Title */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Header Title <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Would you like to give a shoutout?"
              className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
              required
              {...register("headerTitle", { required: true })}
            />
          </div>

          {/* Custom Message */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your custom message <span className="text-orange-500">*</span>
            </label>
            <textarea
              rows="3"
              placeholder="Write a warm message and guide them on recording the testimonial..."
              className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
              {...register("customMessage", { required: true })}
            />
            <p className="text-sm text-gray-500 mt-1">Markdown supported</p>
          </div>

          {/* Questions */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
              Questions (up to 5)
            </label>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <Question
                  key={index}
                  defaultValue={question}
                  questions={questions}
                  index={index}
                  setQuestions={setQuestions}
                />
              ))}
              {questions.length < 5 && (
                <div className="flex items-center gap-2 mt-3">
                  <CirclePlus
                    className="text-blue-600 hover:text-blue-800 dark:text-white dark:hover:text-blue-400 cursor-pointer"
                    onClick={addQuestion}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Add one (up to 5)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Collect extra info
              </label>
              <ModifiedDropdown />
            </div>
          </div>

          {/* Collection Type & Stars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Collection Type <span className="text-orange-500">*</span>
              </label>
              <Dropdown label={watch("collectionType")} dismissOnClick>
                {["Text only", "Video only", "Text and Video"].map((type) => {
                  return (
                    <DropdownItem
                      key={type}
                      onClick={() => setValue("collectionType", type)}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {type}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Collect star ratings
              </label>
              <ToggleSwitch
                {...register("collectStars")}
                checked={watch("collectStars")}
                onChange={() =>
                  setValue("collectStars", !watch("collectStars"))
                }
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CampaignCreation;
