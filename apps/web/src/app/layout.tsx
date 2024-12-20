import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/_components/theme-provider";
import { ModeToggleGroup } from "@/_components/mode-toggle";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const circularMedium = localFont({
	src: "./fonts/circular-medium.ttf",
	variable: "--font-circular-medium",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Stx Support",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${circularMedium.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					<TooltipProvider>{children}</TooltipProvider>
					<ModeToggleGroup />
				</ThemeProvider>
			</body>
		</html>
	);
}
