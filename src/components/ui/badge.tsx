import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[2px] border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground text-background",
        secondary:
          "border-border bg-transparent text-muted-foreground",
        success:
          "border-border bg-secondary text-foreground",
        warning:
          "border-border bg-secondary text-muted-foreground",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
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
