import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer active:scale-95 active:rotate-2",
  {
    variants: {
      variant: {
        Friend: "border-transparent bg-primary text-primary-foreground ",
        Family: "border-transparent bg-secondary text-secondary-foreground",
        Love: "border-transparent bg-rose-500 text-white",
        Colleague: "border-transparent bg-green-600/30 text-lime-50",
        other: "border-primary bg-primary/20 text-purple-200",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "Friend",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
