import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo-dark.svg";
import axios from "axios";
import { Video, PencilLine } from "lucide-react";
import TextReviewModal from "./TextReviewModal";
import VideoReviewModal from "./VideoReviewModal";
import { SERVER_DOMAIN } from "../AppConfig";
import { Toaster } from "react-hot-toast";

function ReviewForm() {
  const { campaignName, campaignId } = useParams();
  const [formConfig, setFormConfig] = useState(null);
  const [showTextReviewModal, setShowTextReviewModal] = useState(false);
  const [showVideoReviewModal, setShowVideoReviewModal] = useState(false);

  useEffect(() => {
    fetchCampaignDetails();
  }, [campaignId]);

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/api/v1/campaign/public/${campaignId}`
      );
      console.log(response.data.data);
      setFormConfig(response.data.data);
    } catch (error) {
      console.log("Could not fetch campaign details", error);
    }
  };

  const handleVideoReviewModal = async () => {
    setShowVideoReviewModal(true);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
          {formConfig ? (
            <>
              {/* Top logo */}
              <div className="w-48 mx-auto mb-4">
                <img
                  src={logo}
                  alt="Site Logo"
                  className="w-full object-contain"
                />
              </div>

              {/* Campaign Info */}
              <div className="flex flex-col items-center text-center gap-5">
                <img
                  className="w-28 h-28 rounded-full object-cover mb-4 border shadow"
                  src={formConfig.campaignLogo}
                  alt="Campaign Logo"
                />
                <div>
                  {/* Header Title */}
                  <h1 className="text-2xl sm:text-4xl font-semibold capitalize mb-2">
                    {formConfig.headerTitle}
                  </h1>
                  {/* Custom Message */}
                  {formConfig.customMessage && (
                    <p className="text-lg text-gray-800">
                      {formConfig.customMessage}
                    </p>
                  )}
                </div>
                {/* Questions */}
                <h2 className="text-xl font-bold -mb-3">Questions</h2>
                <ul className="text-gray-700 text-sm text-left sm:text-base mb-4 list-disc list-inside">
                  {formConfig.questions.map((q) => (
                    <li key={q.id}>{q.question}</li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
                  {(formConfig.collectionType === "Video only" ||
                    formConfig.collectionType === "Text and Video") && (
                    <button
                      className="w-full max-w-7/10 px-4 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 flex items-center justify-center"
                      onClick={() => {
                        handleVideoReviewModal();
                      }}
                    >
                      <Video className="w-5 h-5 mr-2" />
                      Record Video
                    </button>
                  )}

                  {(formConfig.collectionType === "Text only" ||
                    formConfig.collectionType === "Text and Video") && (
                    <button
                      className="w-full max-w-7/10  px-4 py-2 rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 flex items-center justify-center"
                      onClick={() => setShowTextReviewModal(true)}
                    >
                      <PencilLine className="w-5 h-5 mr-2" />
                      Send in Text
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <img
                className="w-full"
                alt="Loading..."
                src="https://i.pinimg.com/originals/3b/4e/10/3b4e109d6b621ed5a9249769afbd4dfa.gif"
              />
            </div>
          )}
        </div>
      </div>
      {showTextReviewModal && (
        <TextReviewModal
          setShowTextReviewModal={setShowTextReviewModal}
          formConfig={formConfig}
        />
      )}
      {showVideoReviewModal && (
        <VideoReviewModal
          setShowVideoReviewModal={setShowVideoReviewModal}
          formConfig={formConfig}
        />
      )}
    </div>
  );
}

export default ReviewForm;
