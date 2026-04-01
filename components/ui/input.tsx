import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "sa-input flex h-8 w-full min-w-0 rounded-md px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
        "placeholder:text-muted-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-3 focus-visible:ring-ring/60",
        className
      )}
      {...props}
    />
  );
}

export { Input };
