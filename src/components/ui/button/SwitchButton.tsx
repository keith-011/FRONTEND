import React from "react";

interface SwitchButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`w-10 h-5 bg-gray-300 rounded-full transition-all peer-checked:bg-forest-500`}
      ></div>
      <span
        className={`absolute left-0 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-all peer-checked:translate-x-5`}
      ></span>
    </label>
  );
};

export default SwitchButton;
