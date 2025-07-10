import React, { useCallback } from "react";
import { cn } from "src/helpers/utils";
import clsx from "clsx";

const ButtonSpinner = () => (
  <svg
    className="w-5 h-5 ml-3 text-white group-hover:text-purple-light animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = ({
  onClick,
  disabled,
  type = "button",
  className,
  iconLeft,
  iconRight,
  iconClass,
  iconSize = 18,
  variant = "primary",
  loading,
  ariaLabel,
  size = "medium",
  style,
  children, // <--- Accepts children
}) => {
  const onClickWrapper = useCallback(
    (event) => {
      if (!loading && !disabled && onClick) {
        onClick(event);
      }
    },
    [loading, disabled, onClick]
  );

  const baseClasses =
    "group flex-center justify-center leading-6 transition duration-150 ease-in-out whitespace-nowrap relative w-fit font-semibold text-sm";
  const sizeClasses = {
    small: "px-3 h-8 text-xs",
    medium: "px-4 h-10 text-sm",
    large: "px-6 h-12 text-base",
  };

  const classButton = cn(
    baseClasses,
    sizeClasses[size],
    {
      "bg-brown text-white rounded-3xl hover:bg-yellow-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 px-8 shadow-md":
        variant === "primary",
      "bg-gray-light border border-brown text-brown rounded-3xl hover:bg-brown hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-md":
        variant === "secondary",
      "bg-red-light text-white rounded-3xl hover:bg-red-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md":
        variant === "alarm",
      "bg-yellow-dark text-white rounded-3xl hover:bg-yellow-light hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 px-8 shadow-md":
        variant === "cta",
      "bg-green-dark rounded-lg text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md":
        variant === "approval",
      "bg-red-light text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md":
        variant === "error",
      "bg-yellow-light text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-md":
        variant === "warning",
      "bg-brown text-white rounded-lg hover:shadow-lg hover:bg-pri-color focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 shadow-md":
        variant === "neutral",
    },
    {
      "cursor-not-allowed": disabled || loading,
      "active:scale-95": !(disabled || loading),
    },
    className
  );

  return (
    <button
      type={type}
      className={variant !== "none" && classButton}
      onClick={onClickWrapper}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      style={style}
    >
      {iconLeft && (
        <span
          className={clsx("mr-1", iconClass)}
          style={{ fontSize: iconSize }}
        >
          {iconLeft}
        </span>
      )}
      {children} {/* <--- Renders children */}
      {iconRight && (
        <span
          className={clsx("ml-1", iconClass)}
          style={{ fontSize: iconSize }}
        >
          {iconRight}
        </span>
      )}
      {loading && <ButtonSpinner />}
    </button>
  );
};