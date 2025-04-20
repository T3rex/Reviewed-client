import { useState } from "react";
import Question from "./Question";
import { CirclePlus } from "lucide-react";
import ModifiedDropdown from "./ModifiedDropdown";
import { Dropdown, DropdownItem, ToggleSwitch } from "flowbite-react";

const defaultQuestions = [
  "Who are you / what are you working on?",
  "How has [our product/service] helped you?",
  "What is the best thing about [our product/service]?",
];

function CampaignCreation() {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [collectStars, setCollectStars] = useState(true);

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions((prev) => [...prev, ""]);
    }
  };

  return (
    <div>
      <div>
        {/* Modal Header */}
        <div className="flex flex-col justify-between items-center mb-6">
          <h2 className=" text-3xl sm:text-4xl text-center p-4 font-bold text-gray-800 dark:text-white">
            Create a New Campaign
          </h2>
          <p className="text-gray-800 dark:text-white text-center">
            After the Campaign is created, it will generate a dedicated page for
            collecting testimonials.
          </p>
        </div>
        {/* Form */}
        <form className="space-y-5">
          {/* Campaign name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Campaign name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Product Feedback"
              className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Public URL will be:{" "}
              <span className="font-semibold">reviewed.com/your-campaign</span>
            </p>
          </div>
          {/* Logo Upload */}
          <div className="flex flex-col sm:flex-row gap-5">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-20 h-20 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center gap-1.5 mb-2">
                <label className="block font-medium text-gray-700 dark:text-gray-300">
                  Campaign logo <span className="text-orange-500">*</span>
                </label>
                <label className="text-md text-gray-500 font-semibold">
                  Default
                </label>
                <input className="mt-1.5" type="checkbox" checked={true} />
              </div>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 hover:cursor-pointer"
              />
            </div>
          </div>
          {/* Header Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Header Title <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Would you like to give a shoutout?"
              className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          {/* Custom Message */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Your custom message <span className="text-orange-500">*</span>
            </label>
            <textarea
              rows="3"
              placeholder="Write a warm message and guide them on recording the testimonial..."
              className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            />
            <p className="text-sm text-gray-500">Markdown supported</p>
          </div>
          {/* Questions (up to 5) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Questions (up to 5)
            </label>
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
              <div className="flex flex-row align-middle gap-2 my-5">
                <CirclePlus
                  className="hover:cursor-pointer  text-white hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={addQuestion}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Add one (up to 5)
                </span>
              </div>
            )}
          </div>
          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Collect extra info
              </label>
              <div>
                <ModifiedDropdown />
              </div>
            </div>
          </div>
          {/* Collection Type */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Collection Type<span className="text-orange-500"> *</span>
              </label>
              <Dropdown
                className="hover:cursor-pointer"
                label="Collection Type"
                dismissOnClick={true}
              >
                <DropdownItem>Text and Video</DropdownItem>
                <DropdownItem>Text only</DropdownItem>
                <DropdownItem>Video only</DropdownItem>
              </Dropdown>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Collect star ratings
              </label>
              <ToggleSwitch checked={collectStars} onChange={setCollectStars} />
            </div>
          </div>
          {/* Bottom Buttons */}s
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-bold px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
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
