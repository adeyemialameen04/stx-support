// Dependencies: pnpm install emblor
// Add the following to tailwind.config.ts: "./node_modules/emblor/dist/index.mjs",

"use client";

import { Label } from "@/components/ui/label";
import { type Tag, TagInput } from "emblor";
import { useState } from "react";

const tags = [
	{
		id: "1",
		text: "Sport",
	},
	{
		id: "2",
		text: "Coding",
	},
	{
		id: "3",
		text: "Travel",
	},
];

export default function Tags({
	onChange,
	value,
}: { onChange: (tags: Tag[]) => void; value: Tag[] }) {
	const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
	const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

	return (
		<div className="space-y-2">
			<Label htmlFor="input-56">Tags</Label>
			<TagInput
				id="input-56"
				tags={value}
				setTags={(newTags) => {
					onChange(newTags);
					// setExampleTags(newTags);
				}}
				placeholder="Add a tag"
				styleClasses={{
					tagList: {
						container: "gap-1 border-b-none",
					},
					input:
						"rounded-lg transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
					tag: {
						body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
						closeButton:
							"absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
					},
				}}
				activeTagIndex={activeTagIndex}
				setActiveTagIndex={setActiveTagIndex}
				inlineTags={false}
				inputFieldPosition="top"
			/>
		</div>
	);
}
