import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-none border-[3px] border-nb-black bg-nb-gray/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
