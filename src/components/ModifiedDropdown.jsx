import { ToggleSwitch, Dropdown } from "flowbite-react";

function ModifiedDropdown({ value, onChange }) {
  const handleToggle = (key, toggleValue) => {
    const updatedField = {
      ...value[key],
      enabled: toggleValue,
      ...(toggleValue === false && { required: false }), // If disabling, also unset required
    };

    onChange({
      ...value,
      [key]: updatedField,
    });
  };

  const handleRequiredChange = (key, requiredValue) => {
    const updatedField = {
      ...value[key],
      required: requiredValue,
      ...(requiredValue === true && { enabled: true }), // If required, ensure enabled
    };

    onChange({
      ...value,
      [key]: updatedField,
    });
  };

  return (
    <div>
      <Dropdown
        className="hover:cursor-pointer text-md p-5"
        label="Name, Email, Title, Social Link"
        dismissOnClick={false}
        size="lg"
      >
        <div className="w-72 p-3 space-y-2">
          {/* Name */}
          <div className="flex items-center justify-between">
            <ToggleSwitch
              checked={value.name.enabled}
              color="blue"
              disabled={true}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Name
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={value.name.required}
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
              checked={value.email.enabled}
              color="blue"
              disabled={false}
              onChange={(val) => handleToggle("email", val)}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Email
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={value.email.required}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={false}
                onChange={(e) =>
                  handleRequiredChange("email", e.target.checked)
                }
              />
              <span className="text-sm font-semibold p-1 text-gray-900 dark:text-gray-300">
                Required?
              </span>
            </label>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between">
            <ToggleSwitch
              checked={value.title.enabled}
              color="blue"
              disabled={false}
              onChange={(val) => handleToggle("title", val)}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Titile, Company
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={value.title.required}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={false}
                onChange={(e) =>
                  handleRequiredChange("title", e.target.checked)
                }
              />
              <span className="text-sm font-semibold p-1 text-gray-900 dark:text-gray-300">
                Required?
              </span>
            </label>
          </div>

          {/* Social Link */}
          <div className="flex items-center justify-between">
            <ToggleSwitch
              checked={value.socialLink.enabled}
              color="blue"
              disabled={false}
              onChange={(val) => handleToggle("socialLink", val)}
            />
            <span className="text-md mr-auto ml-1 p-2 font-semibold text-gray-900 dark:text-gray-300">
              Social Link
            </span>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={value.socialLink.required}
                className="form-checkbox h-4 w-4 text-blue-600"
                disabled={false}
                onChange={(e) =>
                  handleRequiredChange("socialLink", e.target.checked)
                }
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
