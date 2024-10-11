"use client";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@repo/ui/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface ActionButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      className,
      variant,
      size = "lg",
      asChild = false,
      isLoading = false,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        type="submit"
        size={size}
        className={cn("w-full", className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : props.children}
      </Button>
    );
  },
);

ActionButton.displayName = "ActionButton"; // Required for forwardRef in React

export default ActionButton;
