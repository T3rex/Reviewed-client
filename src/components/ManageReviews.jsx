import { useEffect, useState, useMemo, useRef } from "react";
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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Fetch all reviews based on the current page
  const fetchAllReviews = async (pageNum) => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/api/v1/campaign/${campaignId}/review`,
        {
          withCredentials: true,
          params: { page: pageNum, limit },
        }
      );
      setAllReviews((prev) => [...prev, ...response.data.data.reviews]);
      setHasMore(response.data.data.hasMore);
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

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchAllReviews(0), fetchCampaignDetails()]);
      } catch (error) {
        toast.error("Failed to fetch data", { duration: 3000 });
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Observe the loader element for infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const loadingobserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    loadingobserver.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) {
        loadingobserver.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  // Fetch more reviews when page changes
  useEffect(() => {
    if (page === 0) return;
    const fetchMore = async () => {
      await fetchAllReviews(page);
    };
    fetchMore();
  }, [page]);

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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex transition-all">
      <Sidebar filter={filter} setFilter={setFilter} />
      <div className="flex flex-col w-full">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
            {campaignDetails && (
              <CampaignHeader campaignDetails={campaignDetails} />
            )}

            {filteredReviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
                {filteredReviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
              </div>
            ) : (
              <NodeReview filter={filter} />
            )}
          </div>
        )}

        {/* Infinite scroll loader */}
        <div
          ref={loaderRef}
          className="h-12 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
        >
          {hasMore && !loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}

export default ManageCampaign;
