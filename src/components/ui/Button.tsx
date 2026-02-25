import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xs font-black uppercase tracking-[2px] transition-all duration-150 cubic-bezier(0.23, 1, 0.32, 1) focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 min-h-[48px] relative cursor-pointer",
    {
        variants: {
            variant: {
                primary:
                    "bg-[var(--brand-primary)] text-[var(--neutral-0)] border border-[var(--brand-primary)] hover:bg-[var(--neutral-0)] hover:text-[var(--brand-primary)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--brand-primary)] active:-translate-x-[1px] active:-translate-y-[1px] active:shadow-[1px_1px_0_var(--brand-primary)]",
                outline:
                    "bg-transparent text-[var(--brand-primary)] border border-[var(--brand-primary)] hover:bg-[var(--neutral-0)] hover:text-[var(--brand-primary)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--brand-primary)] active:-translate-x-[1px] active:-translate-y-[1px] active:shadow-[1px_1px_0_var(--brand-primary)]",
                secondary:
                    "bg-[var(--brand-accent)] text-[var(--neutral-0)] border border-[var(--brand-accent)] hover:bg-[var(--neutral-0)] hover:text-[var(--brand-accent)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--brand-accent)]",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "px-8 py-4",
                sm: "px-6 py-2",
                lg: "px-10 py-5",
                icon: "h-10 w-10",
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
