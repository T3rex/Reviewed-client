import React from "react";
import { useParams } from "react-router-dom";
function ReviewForm() {
  const { campaignName, campaignId } = useParams();
  return <div>ReviewForm</div>;
}

export default ReviewForm;
