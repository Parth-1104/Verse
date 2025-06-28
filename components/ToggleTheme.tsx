"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // State to handle the toggle slider
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  // Handle the slider toggle
  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Toggle Slider for Light/Dark Modes */}
      <div
        className={`flex items-center gap-2 cursor-pointer transition-colors ${
          isDarkMode ? "text-gray-900 dark:text-gray-100" : "text-gray-700"
        }`}
        onClick={handleToggle}
      >
        <Sun className={`h-5 w-5 ${isDarkMode ? "opacity-40" : "opacity-100"}`} />
        <div
          className={`relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors`}
        >
          <div
            className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full shadow-md transition-transform ${
              isDarkMode ? "translate-x-6 dark:bg-gray-800" : ""
            }`}
          />
        </div>
        <Moon
          className={`h-5 w-5 ${isDarkMode ? "opacity-100" : "opacity-40"}`}
        />
      </div>
    </div>
  );
}
