import { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "../AppConfig";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import CampaignHeader from "./CampaignHeader";
import NodeReview from "./NoReview";
import ReviewCard from "./ReviewCard";

function ManageCampaign() {
  const { campaignId } = useParams();
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchAllReviews(), fetchCampaignDetails()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      toast.error("Failed to fetch reviews", { duration: 3000 });
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/api/v1/campaign/${campaignId}`,
        { withCredentials: true }
      );
      setCampaignDetails(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch campaign details", { duration: 3000 });
      console.error("Error fetching campaign details:", error);
    }
  };

  const filteredReviews = useMemo(() => {
    switch (filter) {
      case "text":
        return allReviews.filter((r) => r.reviewType === "text");
      case "video":
        return allReviews.filter((r) => r.reviewType === "video");
      case "approved":
        return allReviews.filter((r) => r.isApproved);
      case "unapproved":
        return allReviews.filter((r) => !r.isApproved);
      default:
        return allReviews;
    }
  }, [filter, allReviews]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 dark:text-white dark:bg-gray-900 flex transition-all">
      <Sidebar filter={filter} setFilter={setFilter} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex-grow p-6">
          {campaignDetails && (
            <CampaignHeader campaignDetails={campaignDetails} />
          )}

          {filteredReviews?.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredReviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
            </div>
          ) : (
            <NodeReview filter={filter} />
          )}
        </div>
      )}
    </div>
  );
}

export default ManageCampaign;
