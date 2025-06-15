"use client";

import axios from "axios";
import Preview from "./Preview";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "flowbite-react";
import SuccessModal from "./SuccessModal";
import ThankYouPage from "./ThankYouPage";
import ExtraSettings from "./ExtraSettings";
import ThankPreview from "./ThankPreview";
import CampaignCreation from "./CampaignCreation";
import { useForm, FormProvider } from "react-hook-form";
import { X, Blocks, HandHeart, Settings } from "lucide-react";
import { useEffect } from "react";

const defaultQuestions = [
  {
    id: Date.now() + Math.random(),
    question: "Who are you / what are you working on?",
  },
  {
    id: Date.now() + Math.random(),
    question: "How has [our product/service] helped you?",
  },
  {
    id: Date.now() + Math.random(),
    question: "What is the best thing about [our product/service]?",
  },
];

const defaultExtraInfo = {
  name: { enabled: true, required: true },
  email: { enabled: false, required: false },
  title: { enabled: false, required: false },
  socialLink: { enabled: false, required: false },
};

function NewCampaignModal({
  setshowCampaignModal,
  campaignId,
  mode,
  setShowEditModal,
}) {
  const [showForm, setShowForm] = useState("Basic");
  const [questions, setQuestions] = useState(defaultQuestions);
  const [showSucessModal, setshowSucessModal] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

  const [extraInfo, setExtraInfo] = useState(defaultExtraInfo);

  useEffect(() => {
    if (mode == "edit" && campaignId) {
      console.log(campaignId);
      const fetchCampaignData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/campaign/${campaignId}`,
            {
              withCredentials: true,
            }
          );
          const campaign = response?.data?.data;
          methods.reset(campaign);
          setQuestions(campaign?.questions || defaultQuestions);
          setExtraInfo(campaign?.extraInfo || defaultExtraInfo);
          setShowForm("Basic");
        } catch (error) {
          console.log("Error fetching campaign data:", error);
        }
      };
      fetchCampaignData();
    }
  }, [mode, campaignId]);

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
      thankTitle: "",
      thankMessage: "",
      redirectUrl: "",
      allowSMShare: false,
    },
  });

  const onSubmit = (data) => {
    data["questions"] = questions;
    data["extraInfo"] = extraInfo;
    console.log("Form Data:", data);
    submitForm(data);
  };

  const submitForm = async (data) => {
    try {
      const method = mode === "edit" ? axios.put : axios.post;
      const endpoint =
        mode === "edit"
          ? `http://localhost:3000/api/v1/campaign/${campaignId}`
          : "http://localhost:3000/api/v1/campaign";

      const response = await method(endpoint, data, { withCredentials: true });
      const res = response?.data;
      if (res?.success) {
        mode === "edit"
          ? toast.success("Campaign updated successfully 🎉", {
              duration: 3000,
            })
          : toast.success("Campaign created successfully 🎉", {
              duration: 3000,
            });
        setSubmissionLink("http://reviewed.com/" + res?.submissionLink);
        setshowSucessModal(true);
      } else {
        console.error("Failed to create/edit campaign:", res.message);
      }
    } catch (error) {
      toast.error("Something went wrong try again!! ", {
        duration: 3000,
      });
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <>
      {!showSucessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className=" relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 sm:p-10 transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={() =>
                mode == "create"
                  ? setshowCampaignModal(false)
                  : setShowEditModal(false)
              }
              className="absolute top-4  right-4 text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>

            <FormProvider {...methods}>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Preview Section */}
                <div className="lg:w-4/10">
                  {showForm === "Basic" && <Preview questions={questions} />}
                  {showForm === "ThankYouPage" && <ThankPreview />}
                </div>

                {/* Form Section */}
                <div className="lg:w-6/10 w-full">
                  {/* Button Tabs */}
                  <div className="flex flex-wrap justify-center mb-6 ">
                    <Button
                      className={`rounded-l-lg cursor-pointer rounded-r-none flex items-center gap-2 px-4 py-2 border transition ${
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
                      className={`rounded-none cursor-pointer flex items-center gap-2 px-4py-2 border transition ${
                        showForm === "ThankYouPage"
                          ? "bg-primary-800 text-white ring-2 ring-primary-300"
                          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                      }`}
                      onClick={() => setShowForm("ThankYouPage")}
                    >
                      <HandHeart className="w-5 h-5" />
                      <span className="text-sm sm:text-base">
                        Thank You Page
                      </span>
                    </Button>

                    <Button
                      className={` rounded-l-none  cursor-pointer rounded-r-lg flex items-center gap-2 px-4 py-2 border transition ${
                        showForm === "Settings"
                          ? "bg-primary-800 text-white ring-2 ring-primary-300"
                          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                      }`}
                      onClick={() => setShowForm("Settings")}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="text-sm sm:text-base">
                        Extra Settings
                      </span>
                    </Button>
                  </div>

                  {/* Form Content */}
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-6"
                    encType="multipart/form-data"
                  >
                    {showForm === "Basic" && (
                      <CampaignCreation
                        mode={mode}
                        campaignId={campaignId}
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
                        disabled={methods.formState.isSubmitting}
                      >
                        {mode === "create"
                          ? "Create Campaign"
                          : "Update Campaign"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <SuccessModal
            mode={mode}
            setshowSucessModal={setshowSucessModal}
            setshowCampaignModal={setshowCampaignModal}
            setShowEditModal={setShowEditModal}
            submissionLink={submissionLink}
          />
        </FormProvider>
      )}
    </>
  );
}

export default NewCampaignModal;
