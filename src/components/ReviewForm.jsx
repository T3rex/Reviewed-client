import React from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo-dark.svg";
function ReviewForm() {
  const { campaignName, campaignId } = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl h-screen bg-[#fafafa] p-4 shadow-md rounded-xl">
        <div className="w-48">
          <img src={logo} alt="Logo" className="w-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
