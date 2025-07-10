import React from "react";
import clsx from "clsx";
import { cn } from "src/helpers/utils";

const Checkbox = ({ checked, onChange, children, className, ...props }) => {
  return (
    <label
      className={clsx(
        "flex items-center cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {/* Hidden native checkbox input */}
      <input
        type="checkbox"
        className="sr-only" // Needs to be styled to be visually hidden but accessible
        checked={checked}
        // This is the handler receiving the native event 'e'
        // We extract e.target.checked (which is the new boolean state)
        // and pass it to the onChange prop received from the parent.
        onChange={(e) => onChange(e.target.checked)} // Error points here if e.target is undefined
      />

      {/* Custom visual checkbox indicator */}
      <div
        className={cn(
          "w-6 h-6 rounded flex items-center justify-center transition-colors duration-200",
          checked
            ? "bg-pri-color border-pri-color"
            : "bg-white border border-gray-300"
        )}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Label text rendered next to the visual checkbox */}
      {children && <span className="ml-2">{children}</span>}
    </label>
  );
};

export default Checkbox;