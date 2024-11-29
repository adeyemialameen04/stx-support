"use client";

import { Button, type ButtonProps } from "@repo/ui/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { cn } from "@repo/ui/lib/utils";
import { CornerUpLeft } from "lucide-react";
import React from "react";
import { useToolbar } from "../toolbars/toolbar-provider";

const UndoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, onClick, children, ...props }, ref) => {
		const { editor } = useToolbar();

		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn("h-8 w-8", className)}
						onClick={(e) => {
							editor?.chain().focus().undo().run();
							onClick?.(e);
						}}
						disabled={!editor?.can().chain().focus().undo().run()}
						ref={ref}
						{...props}
					>
						{children || <CornerUpLeft className="h-4 w-4" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Undo</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

UndoToolbar.displayName = "UndoToolbar";

export { UndoToolbar };
