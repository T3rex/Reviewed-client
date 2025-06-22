import { useEffect, useState } from "react";
import { X, VideoOff, Video } from "lucide-react";
import StarRating from "./StarRating";
import { Dropdown, DropdownItem, ToggleSwitch } from "flowbite-react";

import {
  useReactMediaRecorder,
  ReactMediaRecorder,
} from "react-media-recorder";

function VideoReviewModal({ setShowVideoReviewModal, formConfig }) {
  const [timer, setTimer] = useState();
  const [videoDevices, setVideoDevice] = useState([]);
  const [audioDevices, setaudioDevices] = useState([]);
  const handleClose = () => setShowVideoReviewModal(false);
  const handleSubmit = () => console.log("Submit");
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: true,
    });

  const startTimer = () => {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev == 1) {
            clearInterval(intervalId);
            resolve();

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }).then(() => startRecording());
  };

  const handleStartRecording = () => {
    setTimer(3);
    startTimer();
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        // const menu = document.getElementById("input-devices");
        // if (device.kind === "audioinput") {
        //   const item = document.createElement("option");
        //   item.textContent = device.label;
        //   item.value = device.deviceId;
        //   menu.appendChild(item);
        // }
        if (device.kind === "videoinput") {
          setVideoDevice((prev) => {
            console.log(device.label);
            prev = [...prev, device];
            return prev;
          });
        }
        if (device.kind === "audioinput") {
          setaudioDevices((prev) => {
            prev = [...prev, device];
            return prev;
          });
        }
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overflow-y-auto">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-600 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col gap-6 mt-2">
          {/* Instructions */}
          {status === "idle" && (
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-semibold">
                Check Your Camera and Microphone
              </h1>
              <p className="text-gray-500 px-2 text-balance">
                You have up to 180 seconds to record your video. Don't worry:
                You can review your video before submitting it, and you can
                re-record if needed.
              </p>
            </div>
          )}
          {/* Questions */}{" "}
          {status === "recording" && (
            <div>
              <h2 className="text-lg font-bold mb-2">Questions</h2>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                {formConfig.questions.map((q) => (
                  <li key={q.id}>{q.question}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Video Recorder */}
          <div>
            {/* <p>{status}</p> */}
            {status == "idle" ? (
              <div className="h-60 w-full bg-gray-800 text-8xl text-white flex items-center justify-center transition-all duration-300 ease-in-out">
                {timer}
              </div>
            ) : (
              <video className="w-full h-60" src={mediaBlobUrl} controls />
            )}
          </div>
          {/* Device Settings */}
          {status === "idle" && (
            <div className="bg-gray-100 p-6 rounded-xl border-gray-300 border-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Device Settings :
              </h2>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <Dropdown
                    className=" cursor-pointer "
                    label={"Camera"}
                    dismissOnClick
                    color={"pink"}
                  >
                    {videoDevices.map((device) => {
                      return (
                        <DropdownItem key={device?.id} className=" ">
                          {device.label}
                        </DropdownItem>
                      );
                    })}
                  </Dropdown>
                </div>
                <div className="flex items-center">
                  <Dropdown
                    className=" cursor-pointer "
                    label={"Audio"}
                    dismissOnClick
                    color={"pink"}
                  >
                    {audioDevices.map((device) => {
                      return (
                        <DropdownItem key={device?.id} className=" ">
                          {device.label}
                        </DropdownItem>
                      );
                    })}
                  </Dropdown>
                </div>
              </div>
            </div>
          )}
          {/* Record/Stop */}
          <div className="flex justify-center">
            {status === "idle" && (
              <button
                className="bg-blue-500 hover:bg-blue-600 rounded-md px-5 py-2 my-2 text-white font-semibold cursor-pointer flex gap-2 w-full text-center items-center justify-center"
                onClick={handleStartRecording}
              >
                <Video /> Record Video
              </button>
            )}
            {status === "recording" && (
              <button
                className="bg-red-500 hover:bg-red-600rounded-md px-5 py-2 my-2 ml-2 text-white font-semibold cursor-pointer w-full flex gap-2 justify-center"
                onClick={stopRecording}
              >
                <VideoOff /> Stop Recording
              </button>
            )}
          </div>
          {/* Questions */}
          {formConfig.collectionType === "Video only" && (
            <>
              <div>
                <h2 className="text-lg font-bold mb-2">Questions</h2>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  {formConfig.questions.map((q) => (
                    <li key={q.id}>{q.question}</li>
                  ))}
                </ul>
              </div>

              {formConfig.collectStars && <StarRating />}

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Name <span className="text-orange-500">*</span>
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

              {/* Permission */}
              <div className="flex items-start gap-3 text-sm ">
                <input type="checkbox" className="mt-1" />
                <label>
                  I give permission to use this testimonial across social
                  channels and other marketing efforts
                </label>
              </div>
            </>
          )}
          {/* Action Buttons */}
          {/* {status === "idle" && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2 rounded-md border cursor-pointer border-gray-300 text-gray-600 bg-white hover:bg-red-500 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 py-2 rounded-md cursor-pointer bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default VideoReviewModal;
