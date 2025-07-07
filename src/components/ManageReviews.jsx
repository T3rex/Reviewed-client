import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVER_DOMAIN } from "../AppConfig";
import { MonitorX } from "lucide-react";

function ManageCampaign() {
  const [reviews, setReviews] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const location = useLocation();
  const campaignId = location.pathname.split("/").pop();

  useEffect(() => {
    fetchAllReviews();
    fetchCampaignDetails();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/api/v1/campaign/${campaignId}/review`,
        { withCredentials: true }
      );
      // console.log("All Reviews:", response.data.data);
      setAllReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/api/v1/campaign/${campaignId}`,
        { withCredentials: true }
      );
      console.log("Campaign Details:", response.data.data);
      setCampaignDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 dark:text-white dark:bg-gray-900 flex transition-all">
      <Sidebar />

      <div className="flex-grow p-6">
        {campaignDetails && (
          <div className="my-5 flex items-center gap-4">
            <img
              src={campaignDetails.campaignLogo}
              alt="Campaign Logo"
              className="w-24 h-24 object-contain rounded"
            />
            <h1 className="text-3xl font-bold capitalize">
              {campaignDetails?.campaignName}
            </h1>
          </div>
        )}

        {allReviews?.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allReviews.map((review) => (
              <div
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2"
                key={review?._id}
              >
                <p className="text-gray-800 dark:text-white">
                  {review?.reviewText}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  — {review?.reviewerName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[75vh] w-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <MonitorX size={70} className="text-gray-400" />
              <h2 className="text-2xl font-semibold">No reviews yet</h2>
              <div className="gap-3 mt-4 flex flex-col sm:flex-row">
                <button className="cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                  Add a video
                </button>
                <button className="cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                  Add a text
                </button>
                <button
                  className="cursor-not-allowed items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-400"
                  disabled
                >
                  Bulk import
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageCampaign;
