import { useEffect, useState, useRef, memo } from "react";
import { X, VideoOff, Video, Send, History } from "lucide-react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { ReactMediaRecorder } from "react-media-recorder";
import TimerDisplay from "./TimerDisplay";
import toast from "react-hot-toast";
import StarRating from "./StarRating";

function VideoReviewModal({ setShowVideoReviewModal, formConfig }) {
  const [countDown, setCountDown] = useState();
  const [videoDevices, setVideoDevice] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState("");
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState("");
  const [permission, setPermission] = useState(false);

  const handleSubmit = () => {
    if (!permission) {
      toast.error("Please give permission!", { duration: 4000 });
      return;
    }
    toast.success("Review sent successfully.", { duration: 4000 });
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
    <div className="fixed inset-0 z-50 pt-30 pb-5 sm:pb-0 sm:pt-0 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overflow-y-auto">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto  p-6 sm:p-8">
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
                previewStream,
              }) => {
                return (
                  <>
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
                    {status === "stopped" && (
                      <div className="flex flex-col items-start gap-3 text-sm my-3">
                        <StarRating />
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
                        >
                          <VideoOff /> Stop Recording
                        </button>
                      )}
                      {console.log(permission)}
                      {status === "stopped" && (
                        <div className="flex flex-col w-full gap-2">
                          <button
                            className="bg-yellow-500 hover:bg-yellow-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                            onClick={() => setStatus("idle")}
                          >
                            <History /> Record Again
                          </button>

                          <button
                            className="bg-green-500 hover:bg-green-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                            onClick={handleSubmit}
                          >
                            <Send /> Confirm to Send
                          </button>
                        </div>
                      )}
                    </div>
                  </>
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
