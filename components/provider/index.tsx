"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "./theme-provider";
import URQLProvider from "./urql-provider";

export function ClientProvider({ children, ...props }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <URQLProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </URQLProvider>
    </ThemeProvider>
  );
}
