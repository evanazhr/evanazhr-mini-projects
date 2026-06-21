import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border-[3px] border-nb-black font-black uppercase tracking-wider text-sm transition-all duration-150 outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-nb-black text-white shadow-[4px_4px_0px_var(--button-shadow,var(--nb-yellow))] hover:shadow-[6px_6px_0px_var(--button-shadow,var(--nb-yellow))] active:shadow-[2px_2px_0px_var(--button-shadow,var(--nb-yellow))]",
        outline: "bg-white text-nb-black shadow-[4px_4px_0px_var(--button-shadow,var(--nb-black))] hover:shadow-[6px_6px_0px_var(--button-shadow,var(--nb-black))] active:shadow-[2px_2px_0px_var(--button-shadow,var(--nb-black))]",
        secondary: "bg-nb-yellow text-nb-black shadow-[4px_4px_0px_var(--button-shadow,var(--nb-black))] hover:shadow-[6px_6px_0px_var(--button-shadow,var(--nb-black))] active:shadow-[2px_2px_0px_var(--button-shadow,var(--nb-black))]",
        ghost: "border-transparent bg-transparent text-nb-black hover:bg-nb-yellow/20 hover:-translate-x-0 hover:-translate-y-0 active:translate-x-0 active:translate-y-0 shadow-none hover:shadow-none active:shadow-none",
        destructive: "bg-nb-red text-white shadow-[4px_4px_0px_var(--button-shadow,var(--nb-black))] hover:shadow-[6px_6px_0px_var(--button-shadow,var(--nb-black))] active:shadow-[2px_2px_0px_var(--button-shadow,var(--nb-black))]",
        link: "border-transparent bg-transparent text-nb-black underline hover:-translate-x-0 hover:-translate-y-0 active:translate-x-0 active:translate-y-0 shadow-none hover:shadow-none active:shadow-none",
      },
      size: {
        default: "h-11 px-5 text-sm gap-2",
        xs: "h-7 px-3 text-xs gap-1",
        sm: "h-9 px-4 text-xs gap-1.5",
        lg: "h-12 px-8 text-base gap-2.5",
        icon: "size-11",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
