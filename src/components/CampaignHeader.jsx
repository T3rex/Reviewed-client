import React from "react";

function CampaignHeader({ campaignDetails }) {
  return (
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
  );
}

export default CampaignHeader;
