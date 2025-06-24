import { useEffect, useState, useRef } from "react";
import { X, VideoOff, Video } from "lucide-react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { ReactMediaRecorder } from "react-media-recorder";

function VideoReviewModal({ setShowVideoReviewModal, formConfig }) {
  const [timer, setTimer] = useState();
  const [videoDevices, setVideoDevice] = useState([]);
  const [audioDevices, setaudioDevices] = useState([]);
  const handleSubmit = () => console.log("Submit");

  const popUpPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return stream;
    } catch (error) {}
  };

  const handleClose = (stopRecording, status) => {
    console.log("status inside:" + status);
    if (status === "recording") {
      console.log("Recording in progress");
      return;
    }
    stopRecording();
    setShowVideoReviewModal(false);
  };

  const handleStartRecording = (startRecording) => {
    setTimer(3);
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalId);
          startRecording();
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

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        // console.log(device);
        if (device.kind === "videoinput") {
          setVideoDevice((prev) => {
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
    <div className="fixed inset-0 z-50 pt-30 pb-5 sm:pb-0 sm:pt-0 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overflow-y-auto">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto  p-6 sm:p-8">
        {/* Modal Content */}
        <div className="flex flex-col gap-6 mt-2">
          {/* Video Area */}
          <div>
            <ReactMediaRecorder
              video
              audio
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
                    {console.log("Error:", error)}
                    {/* Close Button */}
                    {/*  {console.log(status)} */}
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
                      className={
                        "h-80 w-full bg-gray-800 text-7xl text-white flex items-center justify-center rounded-lg my-4 transition-all duration-300 ease-in-out" +
                        (status === "idle" || status === "acquiring_media"
                          ? "opacity-100"
                          : "opacity-0 hidden")
                      }
                    >
                      {timer}
                    </div>
                    {/* Device Settings */}
                    {status === "idle" && (
                      <div className="bg-gray-100 p-4 rounded-xl border border-gray-300 flex flex-col  items-center sm:flex-row justify-between gap-3 sm:items-center  ">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Device Settings
                        </h2>
                        <div className="flex flex-row items-center justify-center sm:flex-row gap-3 w-full sm:w-auto ">
                          <Dropdown
                            label="Camera"
                            dismissOnClick
                            color="pink"
                            className="cursor-pointer"
                          >
                            {videoDevices.map((device) => (
                              <DropdownItem key={device?.id}>
                                {device.label}
                              </DropdownItem>
                            ))}
                          </Dropdown>
                          <Dropdown
                            label="Audio"
                            dismissOnClick
                            color="pink"
                            className="cursor-pointer"
                          >
                            {audioDevices.map((device) => (
                              <DropdownItem key={device?.id}>
                                {device.label}
                              </DropdownItem>
                            ))}
                          </Dropdown>
                        </div>
                      </div>
                    )}
                    {/* Stream Preview */}
                    {status === "recording" && (
                      <VideoPreview stream={previewStream} />
                    )}
                    {/* Recorded Video */}
                    {status === "stopped" && mediaBlobUrl && (
                      <video
                        className="w-full rounded-lg my-4"
                        src={mediaBlobUrl}
                        controls
                      />
                    )}
                    {/* Permission */}
                    {status === "stopped" && (
                      <div className="flex items-start gap-3 text-sm my-3">
                        <input type="checkbox" className="mt-1" />
                        <label>
                          I give permission to use this testimonial across
                          social channels and other marketing efforts
                        </label>
                      </div>
                    )}
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      {status === "idle" && (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-center gap-2 w-full cursor-pointer"
                          onClick={() => handleStartRecording(startRecording)}
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
