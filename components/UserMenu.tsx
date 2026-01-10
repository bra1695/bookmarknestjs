'use client';

import { Moon, Sun, Monitor, Type, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useThemeFont } from '@/hooks/use-theme-font';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';

export function UserMenu() {
  const { theme, setTheme, font, setFont } = useThemeFont();
  const { logout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1">
          <Image
            src="/images/image-avatar.webp"
            alt="Profile Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => setTheme('light')} className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setFont('geist')} className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          Geist Font
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont('inter')} className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          Inter Font
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont('roboto')} className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          Roboto Font
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}