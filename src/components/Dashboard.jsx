import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NewCampaign from "../components/NewCampaign";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-fit bg-gray-50 dark:bg-gray-900 flex transition-all">
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
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            onClick={() => setShowModal(true)}
          >
            + New Campaign
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Reviews
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              128
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Campaigns
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              5
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Avg. Rating
            </p>
            <p className="text-2xl font-bold text-yellow-500">⭐ 4.6</p>
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
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Campaign 1
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: Active
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Campaign 2
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: Completed
              </p>
            </div>
            {/* Add more cards dynamically */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Recent Testimonials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
              <p className="text-gray-800 dark:text-white">
                "Amazing product! Loved it."
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                — John Doe
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
              <p className="text-gray-800 dark:text-white">
                "Support was great and fast."
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                — Jane Smith
              </div>
            </div>
            {/* Add more cards dynamically */}
          </div>
        </section>
        {showModal && <NewCampaign setShowModal={setShowModal} />}
      </main>
    </div>
  );
}
