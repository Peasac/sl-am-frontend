"use client";

import { Bell, HelpCircle, Moon, Search, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  placeholder?: string;
  userName?: string;
}

export function Navbar({ placeholder = "Search assets...", userName = "SA" }: NavbarProps) {
  const { setTheme } = useTheme();

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-14 items-center justify-between bg-surface px-6 shrink-0">
      {/* Search */}
      <div className="relative w-64 group">
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-150 group-focus-within:text-primary"
        />
        <Input
          type="text"
          placeholder={placeholder}
          className="h-9 rounded-lg pl-9 text-[13px]"
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg text-muted-foreground hover:text-primary">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {[Bell, HelpCircle].map((Icon, i) => (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-primary"
          >
            <Icon size={17} />
          </Button>
        ))}
        <div
          className="sa-primary-gradient ml-1 flex size-8 cursor-pointer items-center justify-center rounded-lg text-[11px] font-bold"
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
