"use client";

import { useState } from "react";
import Preview from "./Preview";
import { X, Blocks, HandHeart, Settings, MailPlus } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import CampaignCreation from "./CampaignCreation";
import { Button, ButtonGroup } from "flowbite-react";
import ThankYouPage from "./ThankYouPage";
import ExtraSettings from "./ExtraSettings";

const defaultQuestions = [
  "Who are you / what are you working on?",
  "How has [our product/service] helped you?",
  "What is the best thing about [our product/service]?",
];

function NewCampaignModal({ setShowModal }) {
  const [showForm, setShowForm] = useState("Basic");
  const [questions, setQuestions] = useState(defaultQuestions);

  const [extraInfo, setExtraInfo] = useState({
    name: { enabled: true, required: true },
    email: { enabled: false, required: false },
    title: { enabled: false, required: false },
    socialLink: { enabled: false, required: false },
  });
  const methods = useForm({
    defaultValues: {
      campaignName: "",
      headerTitle: "",
      customMessage: "",
      campaignLogo: "https://i.pravatar.cc/40",
      collectStars: true,
      file: null,
      collectionType: "Text only",
      thankImageUrl:
        "https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif",
      thankTitle: "Thank you!",
      thankMessage:
        "Thank you so much for your shoutout! It means a ton for us! 🙏",
      redirectUrl: "",
      allowSMShare: false,
    },
  });

  const onSubmit = (data) => {
    data["questions"] = questions;
    data["extraInfo"] = extraInfo;
    createNewCampaign(data);
  };

  const createNewCampaign = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/campaign",
        data,
        { withCredentials: true }
      );
      const res = response?.data;
      if (res?.success) {
        toast.success("Campaign created successfully 🎉", {
          duration: 3000,
        });
      } else {
        console.error("Failed to create campaign:", res.message);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className=" relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 sm:p-10 transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <FormProvider {...methods}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Preview Section */}
            <div className="lg:w-4/10">
              <Preview questions={questions} />
            </div>

            {/* Form Section */}
            <div className="lg:w-6/10 w-full">
              {/* Button Tabs */}
              <div className="flex flex-wrap justify-center mb-6">
                <Button
                  className={`rounded-l-lg rounded-r-none flex items-center gap-2 px-4 py-2 border transition ${
                    showForm === "Basic"
                      ? "bg-primary-800 text-white ring-2 ring-primary-300"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                  onClick={() => setShowForm("Basic")}
                >
                  <Blocks className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Basic</span>
                </Button>

                <Button
                  className={`rounded-none flex items-center gap-2 px-4py-2 border transition ${
                    showForm === "ThankYouPage"
                      ? "bg-primary-800 text-white ring-2 ring-primary-300"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                  onClick={() => setShowForm("ThankYouPage")}
                >
                  <HandHeart className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Thank You Page</span>
                </Button>

                <Button
                  className={` rounded-l-none rounded-r-lg flex items-center gap-2 px-4 py-2 border transition ${
                    showForm === "Settings"
                      ? "bg-primary-800 text-white ring-2 ring-primary-300"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                  onClick={() => setShowForm("Settings")}
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Extra Settings</span>
                </Button>
              </div>

              {/* Form Content */}
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {showForm === "Basic" && (
                  <CampaignCreation
                    extraInfo={extraInfo}
                    setExtraInfo={setExtraInfo}
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                )}
                {showForm === "ThankYouPage" && <ThankYouPage />}
                {showForm === "Settings" && <ExtraSettings />}

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-9/10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md transition"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewCampaignModal;
