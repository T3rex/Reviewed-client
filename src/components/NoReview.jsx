import { MonitorX } from "lucide-react";

function NoReview({ filter }) {
  return (
    <div className="flex items-center justify-center h-[75vh] w-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <MonitorX size={70} className="text-gray-400" />
        <h2 className="text-2xl font-semibold">
          {filter === "unapproved" ? "No unapproved reviews" : "No reviews yet"}
        </h2>
        {filter !== "unapproved" && (
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
        )}
      </div>
    </div>
  );
}

export default NoReview;
