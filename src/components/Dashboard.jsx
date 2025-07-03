import axios from "axios";
import toast from "react-hot-toast";
import CampaignCard from "./CampaignCard";
import { RefreshCcw } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import NewCampaignModal from "./NewCampaignModal";

export default function Dashboard() {
  const [showCampaignModal, setshowCampaignModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    try {
      fetchDashboardData();
      toast.success("Dashboard refreshed!");
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
      toast.error("Failed to refresh dashboard data.");
      return;
    }
  };
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard/",
        {
          withCredentials: true,
        }
      );
      setDashboardData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-all">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Overview
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="p-2 bg-white  dark:bg-gray-700 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              onClick={handleRefresh}
            >
              <RefreshCcw color="green" />
            </div>
            <button
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
              onClick={() => setshowCampaignModal(true)}
            >
              + New Campaign
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Reviews
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {dashboardData?.totalReviews || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Campaigns
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {dashboardData?.activeCampaigns || 0}/
              {dashboardData?.totalCampaigns || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average Rating
            </p>
            <p className="text-2xl font-bold text-yellow-500">
              ⭐ {dashboardData?.averageRating || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Plan
            </p>
            <p className="text-2xl font-bold text-emerald-500">Starter</p>
          </div>
        </div>

        {/* Campaigns Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Recent Campaigns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData?.recentCampaigns?.length > 0 &&
              dashboardData?.recentCampaigns.map((campaign) => {
                return <CampaignCard key={campaign._id} campaign={campaign} />;
              })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Recent Testimonials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dashboardData?.recentReviews?.length > 0 &&
              dashboardData?.recentReviews.map((review) => {
                return (
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
                );
              })}
          </div>
        </section>
        {showCampaignModal && (
          <NewCampaignModal
            setshowCampaignModal={setshowCampaignModal}
            mode={"create"}
          />
        )}
      </main>
    </div>
  );
}
