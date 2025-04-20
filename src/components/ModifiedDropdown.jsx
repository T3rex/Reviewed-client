import { ToggleSwitch, Dropdown } from "flowbite-react";
import { useState } from "react";

function ModifiedDropdown() {
  const [email, setEmail] = useState(true);
  const [emailRequired, setEmailRequired] = useState(true);

  const [title, setTitle] = useState(false);
  const [titleRequired, setTitleRequired] = useState(false);

  const [socialLink, setSocialLink] = useState(false);
  const [socialLinkRequired, setSocialLinkRequired] = useState(false);

  return (
    <div>
      <Dropdown
        className="hover:cursor-pointer"
        label="Name, Email, Title, Social Link"
        dismissOnClick={false}
      >
        <div className="w-72 p-3 space-y-2">
          {/* Name */}
          <div className="flex items-center justify-between">
            <ToggleSwitch checked={true} color="blue" disabled={true} />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Name
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={true}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={true}
              />
              <span className="text-sm font-semibold p-1 text-gray-900 dark:text-gray-300">
                Required?
              </span>
            </label>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <ToggleSwitch
              checked={email}
              color="blue"
              disabled={false}
              onChange={setEmail}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Email
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={emailRequired}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={false}
                onChange={(e) => setEmailRequired(e.target.checked)}
              />
              <span className="text-sm font-semibold p-1 text-gray-900 dark:text-gray-300">
                Required?
              </span>
            </label>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between">
            <ToggleSwitch
              checked={title}
              color="blue"
              disabled={false}
              onChange={setTitle}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Titile, Company
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={titleRequired}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={false}
                onChange={(e) => setTitleRequired(e.target.checked)}
              />
              <span className="text-sm font-semibold p-1 text-gray-900 dark:text-gray-300">
                Required?
              </span>
            </label>
          </div>

          {/* Social Link */}
          <div className="flex items-center justify-between">
            <ToggleSwitch
              checked={socialLink}
              color="blue"
              disabled={false}
              onChange={setSocialLink}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Social Link
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={socialLinkRequired}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={false}
                onChange={(e) => setSocialLinkRequired(e.target.checked)}
              />
              <span className="text-sm font-semibold p-1 text-gray-900 dark:text-gray-300">
                Required?
              </span>
            </label>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default ModifiedDropdown;
