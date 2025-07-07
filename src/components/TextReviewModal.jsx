import { X } from "lucide-react";
import StarRating from "./StarRating";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_DOMAIN } from "../AppConfig";

function TextReviewModal({ setShowTextReviewModal, formConfig }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reviewerPhoto: "https://i.pravatar.cc/40",
      reviewType: "text",
    },
  });

  const { campaignName, campaignId } = useParams();
  const [rating, setRating] = useState(5);
  const [permission, setPermission] = useState(false);

  const handleClose = () => setShowTextReviewModal(false);

  const onSubmit = async (data) => {
    if (!permission) {
      toast.error("Please give permission", { duration: 4000 });
      return;
    }
    const payload = { ...data, rating };
    submitForm(payload);
  };

  const submitForm = async (data) => {
    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/submit/${campaignName}/${campaignId}`,
        data,
        { withCredentials: true }
      );
      toast.success("Review submitted succesfully.", { duration: 4000 });
      setShowTextReviewModal(false);
    } catch (error) {
      toast.error("Something went wrong try again!! ", {
        duration: 4000,
      });
      console.error("Error creating campaign:", error);
    }
  };

  const handleAttachments = async (e) => {
    const files = e.target.files;
    console.log(files);
    if (!files || files.length == 0) return;
    if (files.length > 5) {
      toast.error("Please select upto 5 images only", { duration: 4000 });
    }
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await axios.post(
        `${SERVER_DOMAIN}/api/v1/upload/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);

    try {
      await axios.post("http://localhost:3000/api/v1/upload/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const reviewerPhoto = URL.createObjectURL(file);
      setValue("reviewerPhoto", reviewerPhoto);
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="relative bg-white rounded-2xl overflow-y-scroll shadow-2xl w-full max-w-lg mx-auto p-6 sm:p-8 no-scrollbar">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-600 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 mt-2">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-semibold">Write a review for</h1>
              <img
                className="w-20 h-20 rounded-full object-cover border"
                src={formConfig.campaignLogo}
                alt="Campaign Logo"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Questions</h2>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                {formConfig.questions.map((q) => (
                  <li key={q.id}>{q.question}</li>
                ))}
              </ul>
            </div>

            {formConfig.collectStars && (
              <StarRating rating={rating} setRating={setRating} />
            )}

            <div className="flex flex-col gap-4">
              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Review <span className="text-orange-500">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your review here"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  {...register("reviewText")}
                />
              </div>
              {/* Attachments */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium mb-1">
                  Attach Image(s)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-black text-sm file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-700 file:text-white hover:cursor-pointer hover:file:bg-primary-800 file:cursor-pointer"
                  multiple
                  onChange={(e) => handleAttachments(e)}
                />
              </div>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={50}
                  {...register("reviewerName")}
                />
              </div>
              {/* Email */}
              {formConfig.extraInfo.email.enabled && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Email{" "}
                    {formConfig.extraInfo.email.required && (
                      <span className="text-orange-500">*</span>
                    )}
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={50}
                    {...register("reviewerEmail")}
                  />
                </div>
              )}
              {/* Social Link */}
              {formConfig.extraInfo.socialLink.enabled && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Social Link{" "}
                    {formConfig.extraInfo.socialLink.required && (
                      <span className="text-orange-500">*</span>
                    )}
                  </label>
                  <input
                    type="url"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={50}
                    {...register("reviewerSocialLink")}
                  />
                </div>
              )}
              {formConfig.extraInfo.title.enabled && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Title{" "}
                    {formConfig.extraInfo.title.required && (
                      <span className="text-orange-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={50}
                    {...register("reviewerTitle")}
                  />
                </div>
              )}
            </div>

            {/* Upload Photo */}
            <div>
              <label className="block text-sm font-medium mb-2 ">
                Upload your photo
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={watch("reviewerPhoto")}
                  alt="Preview"
                  className="w-20 h-20 rounded-full border border-gray-300 object-fill"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
              </div>
            </div>
            {/* Permission */}
            <div className="flex items-start gap-3 text-sm ">
              <input
                type="checkbox"
                className="mt-1"
                onClick={() => {
                  setPermission((prev) => !prev);
                }}
              />
              <label>
                I give permission to use this testimonial across social channels
                and other marketing efforts
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2 rounded-md border cursor-pointer border-gray-300 text-gray-600 bg-white hover:bg-red-500 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 rounded-md cursor-pointer bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TextReviewModal;
