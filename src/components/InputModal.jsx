import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";

function InputModal({ mode, campaignId, campaignName, setShowInputModal }) {
  const methods = useForm({
    defaultValues: {
      campaignName: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const [showSucessModal, setshowSucessModal] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

  const onSubmit = async (data) => {
    try {
      createDuplicateCampaign(data);
      setshowSucessModal(true);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Failed to create duplicate campaign.");
      return;
    }
  };

  const createDuplicateCampaign = async (data) => {
    try {
      const campaignName = data.campaignName;
      const campaignData = await axios.post(
        "http://localhost:3000/api/v1/campaign/duplicate",
        {
          campaignId: campaignId,
          campaignName: campaignName,
        },
        { withCredentials: true }
      );
      if (campaignData?.data?.success) {
        setSubmissionLink(campaignData?.data?.submissionLink);
        toast.success("Duplicate campaign created successfully! 🎉");
        setshowSucessModal(true);
      } else {
        toast.error("Failed to create duplicate campaign.");
      }
    } catch (error) {
      console.error("Error creating duplicate campaign:", error);
      toast.error("Failed to create duplicate campaign.");
      return;
    }
  };

  useEffect(() => {
    if (errors?.campaignName?.message) {
      toast.error(errors.campaignName.message);
    }
  }, [errors?.campaignName?.message]);

  return (
    <>
      {!showSucessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 sm:p-10 transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowInputModal(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col items-center pt-4">
                  <label className="text-center block text-2xl font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duplicate Campaign{" "}
                    <p className="italic text-sm text-gray-500 my-1">
                      All the settings of the new campaign will be same as{" "}
                      {campaignName} campaign.
                      <span className="text-orange-500">*</span>
                    </p>
                  </label>
                  <input
                    type="text"
                    placeholder="New Campaign Name"
                    className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:text-white"
                    maxLength={50}
                    {...register("campaignName", {
                      required: "Campaign name is required",
                      validate: async (value) => {
                        try {
                          const response = await axios.post(
                            "http://localhost:3000/api/v1/campaign/check-availability",
                            { campaignName: value },
                            { withCredentials: true }
                          );
                          const savedId = response?.data?.campaignId;

                          if (savedId) {
                            if (mode === "edit" && savedId === campaignId) {
                              return true;
                            }
                            return "Campaign name is already taken";
                          }
                          return true;
                        } catch (error) {
                          console.error("Error checking name:", error);
                          return "Error validating campaign name";
                        }
                      },
                    })}
                  />

                  <p className="text-sm text-gray-500 mt-1">
                    Public URL:
                    <span className="font-semibold">
                      reviewed.com/
                      {watch("campaignName").split(" ").join("-")}
                    </span>
                  </p>

                  <button
                    type="submit"
                    className="mt-4 w-full sm:w-9/10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md transition"
                    disabled={isSubmitting}
                  >
                    Create Duplicate Campaign
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <SuccessModal
            mode={"duplicate"}
            setshowSucessModal={setshowSucessModal}
            submissionLink={submissionLink}
            setShowInputModal={setShowInputModal}
          />
        </FormProvider>
      )}
    </>
  );
}

export default InputModal;
