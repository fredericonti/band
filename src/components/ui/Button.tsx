import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button — Pedestal Design System
 * 
 * Variants:
 *   primary    → black bg, white text (default)
 *   outline    → transparent bg, black border
 *   secondary  → gray solid (#626262)
 *   ghost      → transparent, white text (for dark backgrounds)
 *   link       → text-only with underline
 */
const buttonVariants = cva(
    [
        "inline-flex items-center justify-center whitespace-nowrap",
        "font-bold uppercase tracking-[0.4px] leading-[1.20]",
        "transition-all duration-[150ms] ease-out",
        "focus-visible:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px]",
        "disabled:pointer-events-none disabled:opacity-40",
        "cursor-pointer relative",
        "font-[var(--font-main)]",
    ].join(" "),
    {
        variants: {
            variant: {
                primary: [
                    "bg-[#212121] text-white border-0",
                    "rounded-[4px]",
                    "hover:bg-[#0A4AFD] hover:text-white",
                    "focus-visible:outline-white",
                ].join(" "),

                outline: [
                    "bg-transparent text-[#212121] border border-[rgba(33,33,33,0.2)]",
                    "rounded-[2px]",
                    "hover:bg-[#0A4AFD] hover:border-[#0A4AFD] hover:text-white",
                    "focus-visible:outline-[#212121]",
                ].join(" "),

                secondary: [
                    "bg-[#626262] text-white border-0",
                    "rounded-[8px]",
                    "hover:bg-[#0A4AFD] hover:text-white",
                    "focus-visible:outline-white",
                ].join(" "),

                ghost: [
                    "bg-white/10 text-white border-0",
                    "rounded-[4px]",
                    "hover:bg-[#0A4AFD] hover:text-white",
                    "focus-visible:outline-white",
                ].join(" "),

                link: [
                    "text-[#212121] underline underline-offset-4",
                    "p-0 h-auto font-medium normal-case tracking-normal",
                    "hover:opacity-50",
                ].join(" "),
            },
            size: {
                default: "h-[44px] px-6 text-[15px]",
                sm:      "h-[36px] px-4 text-[13px]",
                lg:      "h-[52px] px-8 text-[15px]",
                xl:      "h-[56px] px-10 text-[15px]",
                icon:    "h-[44px] w-[44px] p-0",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
