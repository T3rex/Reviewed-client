"use client";

import { useState } from "react";
import Preview from "./Preview";
import { X, Blocks, HandHeart, Settings, MailPlus } from "lucide-react";
import CampaignCreation from "./CampaignCreation";
import { Button, ButtonGroup } from "flowbite-react";

function NewCampaignModal({ setShowModal }) {
  const [showForm, setShowForm] = useState("Basic");
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] transition-all duration-300 overflow-y-auto no-scrollbar">
          <X
            onClick={() => setShowModal(false)}
            className="sticky text-gray-500 hover:text-red-500 dark:hover:text-red-400"
          />
          <Preview />
          <div className="flex justify-center my-5">
            <ButtonGroup outline>
              <Button onClick={() => setShowForm("Basic")}>
                <Blocks className="me-2 h-4 w-4" />
                Basic
              </Button>
              <Button onClick={() => setShowForm("ThankYou")}>
                <HandHeart className="me-2 h-4 w-4" />
                Thank you page
              </Button>
              <Button onClick={() => setShowForm("Settings")}>
                <Settings className="me-3 h-4 w-4" />
                Extra Settings
              </Button>
            </ButtonGroup>
          </div>
          {showForm === "Basic" && <CampaignCreation />}
        </div>
      </div>
    </div>
  );
}

export default NewCampaignModal;
