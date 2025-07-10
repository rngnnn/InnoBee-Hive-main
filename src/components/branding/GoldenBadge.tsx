import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function GoldenBadge({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span
      className={twMerge(
        "text-xl bg-yellowRadial p-1.5 text-white rounded-sm block",
        className
      )}
    >
      {children}
    </span>
  );
}
