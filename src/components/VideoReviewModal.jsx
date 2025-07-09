import { useEffect, useState, useRef, memo } from "react";
import { X, VideoOff, Video, Send, History } from "lucide-react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StarRating from "./StarRating";
import axios from "axios";
import { SERVER_DOMAIN, CLOUDINARY_UPLOAD_URL } from "../AppConfig";
import { useParams } from "react-router-dom";

function VideoReviewModal({ setShowVideoReviewModal, formConfig }) {
  const { campaignId, campaignName } = useParams();
  const [countDown, setCountDown] = useState();
  const [videoDevices, setVideoDevice] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState("");
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState("");
  const [permission, setPermission] = useState(false);
  const [rating, setRating] = useState(5);
  const reviewVideoFile = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { reviewType: "video" } });

  const onSubmit = async (data) => {
    if (!permission) {
      toast.error("Please give permission!");
      return;
    }
    try {
      const uploadRes = await uploadVideoFile(reviewVideoFile.current);
      if (!uploadRes) return;

      const payload = {
        ...data,
        rating,
        videoLink: uploadRes.secure_url,
        reviewType: "video",
      };
      await submitForm(payload);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const uploadVideoFile = async (blobUrl) => {
    try {
      const blob = await fetch(blobUrl).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "testimonial_preset");
      formData.append("folder", "testimonials");

      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);

      return response.data; // contains secure_url, etc.
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Video upload failed");
      return null;
    }
  };

  const submitForm = async (data) => {
    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/submit/${campaignName}/${campaignId}`,
        data,
        { withCredentials: true }
      );
      toast.success("Review submitted succesfully.", { duration: 4000 });
      setShowVideoReviewModal(false);
    } catch (error) {
      toast.error("Something went wrong try again!! ", {
        duration: 4000,
      });
      console.error("Error creating campaign:", error);
    }
  };

  const handleClose = (stopRecording, status) => {
    if (status === "recording") {
      toast.error("Please stop the recording before closing.", {
        duration: 4000,
      });
      return;
    }
    stopRecording();
    setShowVideoReviewModal(false);
  };

  const handleStartRecording = (startRecording, stopRecording, status) => {
    setCountDown(3);
    const intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          startRecording();
          const timerId = setTimeout(() => {
            if (status === "recording") {
              toast.error(
                "Recording stopped after 3 minutes",
                { icon: "⏱️" },
                {
                  duration: 4000,
                }
              );
              stopRecording();
            }
            clearTimeout(timerId);
          }, 180 * 1000);

          return prev - 1;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = (stopRecording, status) => {
    if (status == "recording") {
      stopRecording();
    }
  };

  const VideoPreview = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    if (!stream) return null;

    return (
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-md"
        autoPlay
        muted
        playsInline
      />
    );
  };
  const MemoizedVideoPreview = memo(VideoPreview);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      const audioInputs = devices.filter((d) => d.kind === "audioinput");

      setVideoDevice(videoInputs);
      setAudioDevices(audioInputs);

      setSelectedVideoDeviceId(
        (prev) => prev || videoInputs[0]?.deviceId || ""
      );
      setSelectedAudioDeviceId(
        (prev) => prev || audioInputs[0]?.deviceId || ""
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="relative bg-white h-fit rounded-2xl overflow-y-scroll shadow-2xl w-full max-w-lg mx-auto p-6 sm:p-8 no-scrollbar">
        {/* Modal Content */}
        <div className="flex flex-col gap-6 mt-2">
          {/* Video Area */}
          <div>
            <ReactMediaRecorder
              video={
                selectedVideoDeviceId
                  ? { deviceId: selectedVideoDeviceId }
                  : true
              }
              audio={
                selectedAudioDeviceId
                  ? { deviceId: selectedAudioDeviceId }
                  : true
              }
              onStart={() => {
                toast.success("Recording started", { duration: 4000 });
              }}
              onStop={() => {
                toast.success("Recording completed succesfully", {
                  duration: 4000,
                });
              }}
              render={({
                error,
                status,
                askPermissionOnMount = true,
                startRecording,
                stopRecording,
                mediaBlobUrl,
                clearBlobUrl,
                previewStream,
              }) => {
                reviewVideoFile.current = mediaBlobUrl;

                return (
                  <div>
                    {/* Close Button */}
                    <button
                      onClick={() => handleClose(stopRecording, status)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    {/* Instructions */}
                    {status === "idle" && (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-semibold">
                          Check Your Camera and Microphone
                        </h1>
                        <p className="text-gray-500 px-2 text-balance">
                          You have up to 180 seconds to record your video.
                          Don&apos;t worry: You can review your video before
                          submitting it, and you can re-record if needed.
                        </p>
                      </div>
                    )}
                    {/* Error Message */}
                    {error && (
                      <div className="text-red-500 text-center">
                        <p className="text-sm font-semibold my-2">
                          {(error === "permission_denied" &&
                            "Camera and microphone permissions are required to record a video.") ||
                            error}
                        </p>
                      </div>
                    )}

                    {/* Questions */}
                    {(status === "recording" ||
                      status === "acquiring_media") && (
                      <div className="mb-3">
                        <h2 className="text-lg font-bold mb-2">Questions</h2>
                        <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                          {formConfig.questions.map((q) => (
                            <li key={q.id}>{q.question}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Timer */}
                    <div
                      className={`h-80 w-full bg-gray-800 text-8xl mb-0 text-white flex items-center justify-center rounded-2xl rounded-b-none my-4 transition-all duration-300 ease-in-out ${
                        status === "idle" || status === "acquiring_media"
                          ? "opacity-100"
                          : "opacity-0 hidden"
                      }`}
                    >
                      {countDown || <Video size={100} />}
                    </div>

                    {/* Device Settings */}
                    {status === "idle" && (
                      <div className="h-fit bg-gray-50 p-4 rounded-t-none mt-0 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 w-full items-center sm:items-center">
                        <h2 className="text-xl font-semibold text-gray-800 text-center sm:text-left">
                          Device Settings
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-between w-full gap-6">
                          <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-1/2">
                            <Dropdown
                              label="Camera"
                              dismissOnClick
                              color="pink"
                              className="cursor-pointer "
                            >
                              {videoDevices.map((device) => (
                                <DropdownItem
                                  key={device.deviceId}
                                  onClick={() => {
                                    setSelectedVideoDeviceId(device.deviceId);
                                    toast.success(
                                      `Selected camera: ${device.label}`
                                    );
                                  }}
                                >
                                  {device.label || "Unnamed Camera"}
                                </DropdownItem>
                              ))}
                            </Dropdown>
                            <p className="text-sm text-gray-500">
                              {
                                videoDevices.find(
                                  (d) => d.deviceId === selectedVideoDeviceId
                                )?.label
                              }
                            </p>
                          </div>

                          <div className="flex flex-col  justify-center items-center  gap-2 w-full sm:w-1/2">
                            <Dropdown
                              label="Microphone"
                              dismissOnClick
                              color="pink"
                              className="cursor-pointer "
                            >
                              {audioDevices.map((device) => (
                                <DropdownItem
                                  key={device.deviceId}
                                  onClick={() => {
                                    setSelectedAudioDeviceId(device.deviceId);
                                    toast.success(
                                      `Selected microphone: ${device.label}`
                                    );
                                  }}
                                >
                                  {device.label || "Unnamed Microphone"}
                                </DropdownItem>
                              ))}
                            </Dropdown>
                            <p className="text-sm text-gray-500">
                              {
                                audioDevices.find(
                                  (d) => d.deviceId === selectedAudioDeviceId
                                )?.label
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Stream Preview */}
                    {status === "recording" && (
                      <MemoizedVideoPreview
                        stream={previewStream}
                        className="object-cover"
                      />
                    )}
                    {/* Recorded Video */}
                    {status === "stopped" && mediaBlobUrl && (
                      <video
                        className="w-full rounded-lg my-4"
                        src={mediaBlobUrl}
                        controls
                      />
                    )}
                    {/* Post Recording */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {status === "stopped" && (
                        <div className="flex flex-col items-start gap-3 text-sm my-3">
                          <StarRating rating={rating} setRating={setRating} />
                          <div className="flex flex-col gap-4 w-full">
                            {/* Name */}
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Your Name{" "}
                                <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="text"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={50}
                                {...register("reviewerName", {
                                  required: true,
                                })}
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
                                  {...register("reviewerEmail", {
                                    required:
                                      formConfig.extraInfo.email.required,
                                  })}
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
                                  {...register("reviewerSocialLink", {
                                    required:
                                      formConfig.extraInfo.socialLink.required,
                                  })}
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
                                  {...register("reviewerTitle", {
                                    required:
                                      formConfig.extraInfo.title.required,
                                  })}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              className="mt-1 cursor-pointer"
                              onClick={() => setPermission((prev) => !prev)}
                            />
                            <label className="text-sm text-gray-700 leading-snug">
                              I give permission to use this testimonial across
                              social channels and other marketing efforts
                            </label>
                          </div>
                        </div>
                      )}
                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        {status === "idle" && (
                          <button
                            className="bg-blue-500 hover:bg-blue-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                            onClick={() =>
                              handleStartRecording(
                                startRecording,
                                stopRecording,
                                status
                              )
                            }
                            type="button"
                          >
                            <Video /> Record Video
                          </button>
                        )}
                        {status === "recording" && (
                          <button
                            className="bg-red-500 hover:bg-red-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                            onClick={() =>
                              handleStopRecording(stopRecording, status)
                            }
                            type="button"
                          >
                            <VideoOff /> Stop Recording
                          </button>
                        )}
                        {status === "stopped" && (
                          <div className="flex flex-col w-full gap-2">
                            <button
                              className="bg-yellow-500 hover:bg-yellow-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                              onClick={() => clearBlobUrl()}
                              type="button"
                            >
                              <History /> Record Again
                            </button>

                            <button
                              className="bg-green-500 hover:bg-green-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                              type="submit"
                            >
                              <Send /> Confirm to Send
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoReviewModal;
