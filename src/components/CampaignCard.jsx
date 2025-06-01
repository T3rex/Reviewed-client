import React from "react";
import {
  Ellipsis,
  ListTodo,
  Link,
  SquarePen,
  Copy,
  TriangleAlert,
} from "lucide-react";
import { Dropdown, DropdownItem, DropdownDivider } from "flowbite-react";

function CampaignCard({ campaign }) {
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
          <DropdownItem icon={Link}>Get link</DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={SquarePen}>Edit campaign</DropdownItem>
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
    </div>
  );
}

export default CampaignCard;
