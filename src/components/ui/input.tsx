import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-none border-[3px] border-nb-black bg-nb-beige px-3 text-base font-medium text-nb-black outline-none placeholder:text-nb-placeholder transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:bg-white focus-visible:shadow-[4px_4px_0px_var(--page-accent,var(--nb-blue))] focus-visible:border-nb-black",
        className
      )}
      {...props}
    />
  )
}

export { Input }
