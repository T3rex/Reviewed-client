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
import InputModal from "./InputModal";

function CampaignCard({ campaign }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

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

  const handleDuplicateCampaign = async (campaignId) => {
    setShowInputModal(true);
  };

  const deletCampaign = async (campaignId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/campaign/${campaignId}`,
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast.success("Campaign deleted successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to delete campaign.");
      }
    } catch (error) {
      toast.error("Failed to delete campaign.");
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
          <DropdownItem icon={Copy} onClick={handleDuplicateCampaign}>
            Duplicate campaign
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            className="hover:text-red-500"
            icon={TriangleAlert}
            onClick={() => deletCampaign(campaign?._id)}
          >
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
      {showInputModal && (
        <InputModal
          mode="duplicate"
          campaignId={campaign?._id}
          setShowInputModal={setShowInputModal}
          campaignName={campaign?.campaignName}
        />
      )}
    </div>
  );
}

export default CampaignCard;
