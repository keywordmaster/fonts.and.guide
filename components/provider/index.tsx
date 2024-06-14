"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from './theme-provider';

export function ClientProvider({ children, ...props }) {
	return <ThemeProvider
		attribute="class"
		defaultTheme="system"
		enableSystem
		disableTransitionOnChange
	>
		<TooltipProvider>
			{children}
		</TooltipProvider>
	</ThemeProvider>
}
