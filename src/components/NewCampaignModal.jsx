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
      collectionType: "Text Only",
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
        console.log("Campaign created successfully:", res.data);
        toast.success("New Campaign Created ", {
          duration: 3000,
        });

        // Redirect or show success message
      } else {
        console.error("Failed to create campaign:", res.message);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] transition-all duration-300 overflow-y-auto no-scrollbar">
          <X
            onClick={() => setShowModal(false)}
            className="sticky text-white hover:cursor-pointer hover:text-red-500 dark:hover:text-red-400"
          />
          <Preview />
          <div className="flex justify-center items-center my-5 mr-6">
            <ButtonGroup outline>
              <Button
                className={`${
                  showForm === "Basic"
                    ? "border-primary-800 bg-primary-800 text-white ring-primary-300 font-bold"
                    : ""
                } hover:cursor-pointer`}
                onClick={() => setShowForm("Basic")}
              >
                <Blocks className="me-2 h-4 w-4 " />
                <p className="text-center text-sm sm:text-lg">Basic</p>
              </Button>
              <Button
                className={`${
                  showForm === "ThankYouPage"
                    ? "border-primary-800 bg-primary-800 text-white ring-primary-300 font-bold"
                    : ""
                } min-w-fit hover:cursor-pointer`}
                onClick={() => setShowForm("ThankYouPage")}
              >
                <HandHeart className="me-2 h-5 w-5" />
                <div className="flex flex-col sm:flex-row text-center text-sm sm:text-lg gap-0 sm:gap-2">
                  <span>Thank you</span>
                  <span>page</span>
                </div>
              </Button>
              <Button
                className={`${
                  showForm === "Settings"
                    ? "border-primary-800 bg-primary-800 text-white ring-primary-300 font-bold"
                    : ""
                }hover:cursor-pointer`}
                onClick={() => setShowForm("Settings")}
              >
                <Settings className="me-2 h-4 w-4" />
                <p className="text-center text-sm sm:text-lg">
                  Extra <span className="hidden sm:inline">Settings</span>
                  <br className="sm:hidden" />
                  <span className="sm:hidden">Settings</span>
                </p>
              </Button>
            </ButtonGroup>
          </div>
          <FormProvider {...methods}>
            <form
              className="space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-9/10 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default NewCampaignModal;
