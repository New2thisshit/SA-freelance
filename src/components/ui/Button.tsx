"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
            outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800/50",
            ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-slate-50",
            link: "text-emerald-500 underline-offset-4 hover:underline",
        };

        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-lg px-3 text-sm",
            lg: "h-14 rounded-2xl px-8 text-lg",
            icon: "h-11 w-11",
        };

        return (
            <motion.button
                whileHover={variant !== 'link' && variant !== 'ghost' ? { scale: 1.02 } : {}}
                whileTap={variant !== 'link' ? { scale: 0.98 } : {}}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props as any}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
