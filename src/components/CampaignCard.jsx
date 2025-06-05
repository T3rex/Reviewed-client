import { useState } from "react";
import {
  Ellipsis,
  ListTodo,
  Link,
  SquarePen,
  Copy,
  TriangleAlert,
} from "lucide-react";
import { Dropdown, DropdownItem, DropdownDivider } from "flowbite-react";
import toast from "react-hot-toast";
import axios from "axios";
import NewCampaignModal from "./NewCampaignModal";
import { set } from "react-hook-form";

function CampaignCard({ campaign }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditCampaign = () => {
    setShowEditModal(true);
  };

  const handleGetCampaignLink = async (campaignId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/campaign/submission-link/${campaignId}`,
        {
          withCredentials: true,
        }
      );
      navigator.clipboard.writeText(response?.data?.data);
      toast.success("Campaign link copied to clipboard!");
    } catch (error) {
      console.error("Error getting campaign link:", error);
      toast.error("Failed to get campaign link.");
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
      key={campaign?._id}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {campaign?.campaignName}
        </h3>
        <Dropdown
          label=""
          dismissOnClick={false}
          placement="left-start"
          renderTrigger={() => (
            <Ellipsis className="cursor-pointer" color="white" />
          )}
        >
          <DropdownItem icon={ListTodo}>Manage reviews</DropdownItem>
          <DropdownDivider />
          <DropdownItem
            icon={Link}
            onClick={() => handleGetCampaignLink(campaign?._id)}
          >
            Get link
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={SquarePen} onClick={handleEditCampaign}>
            Edit campaign
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={Copy}>Duplicate campaign</DropdownItem>
          <DropdownDivider />
          <DropdownItem className="hover:text-red-500" icon={TriangleAlert}>
            Delete campaign
          </DropdownItem>
        </Dropdown>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {campaign?.status}
      </p>
      {showEditModal && (
        <NewCampaignModal
          campaignId={campaign?._id}
          mode="edit"
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}

export default CampaignCard;
