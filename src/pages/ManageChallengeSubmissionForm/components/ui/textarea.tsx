import * as React from "react";

import { cn } from "src/helpers/utils";
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-40 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed focus:border-pri-color disabled:opacity-50  ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
