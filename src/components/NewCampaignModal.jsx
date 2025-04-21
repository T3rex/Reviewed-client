"use client";

import { useState } from "react";
import Preview from "./Preview";
import { X, Blocks, HandHeart, Settings, MailPlus } from "lucide-react";
import CampaignCreation from "./CampaignCreation";
import { Button, ButtonGroup } from "flowbite-react";
import ThankYouPage from "./ThankYouPage";

function NewCampaignModal({ setShowModal }) {
  const [showForm, setShowForm] = useState("Basic");
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] transition-all duration-300 overflow-y-auto no-scrollbar">
          <X
            onClick={() => setShowModal(false)}
            className="sticky text-white hover:cursor-pointer hover:text-red-500 dark:hover:text-red-400"
          />
          <Preview />
          <div className="flex justify-center items-center my-5 mr-6">
            <ButtonGroup outline>
              <Button
                className={`${
                  showForm === "Basic"
                    ? "border-primary-800 bg-primary-800 text-white ring-primary-300 font-bold"
                    : ""
                } hover:cursor-pointer`}
                onClick={() => setShowForm("Basic")}
              >
                <Blocks className="me-2 h-4 w-4 " />
                <p className="text-center text-sm sm:text-lg">Basic</p>
              </Button>
              <Button
                className={`${
                  showForm === "ThankYouPage"
                    ? "border-primary-800 bg-primary-800 text-white ring-primary-300 font-bold"
                    : ""
                } min-w-fit hover:cursor-pointer`}
                onClick={() => setShowForm("ThankYouPage")}
              >
                <HandHeart className="me-2 h-5 w-5" />
                <div className="flex flex-col sm:flex-row text-center text-sm sm:text-lg gap-0 sm:gap-2">
                  <span>Thank you</span>
                  <span>page</span>
                </div>
              </Button>
              <Button
                className={`${
                  showForm === "Settings"
                    ? "border-primary-800 bg-primary-800 text-white ring-primary-300 font-bold"
                    : ""
                }hover:cursor-pointer`}
                onClick={() => setShowForm("Settings")}
              >
                <Settings className="me-2 h-4 w-4" />
                <p className="text-center text-sm sm:text-lg">
                  Extra <span className="hidden sm:inline">Settings</span>
                  <br className="sm:hidden" />
                  <span className="sm:hidden">Settings</span>
                </p>
              </Button>
            </ButtonGroup>
          </div>
          {showForm === "Basic" && <CampaignCreation />}
          {showForm === "ThankYouPage" && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default NewCampaignModal;
