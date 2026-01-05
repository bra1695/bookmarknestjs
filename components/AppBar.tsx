'use client';

import { Search, Plus, Moon, Sun, Monitor, Type } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useThemeFont } from '@/hooks/use-theme-font';
import Image from 'next/image';

interface AppBarProps {
  onSearch?: (query: string) => void;
  onAddBookmark?: () => void;
}

export function AppBar({ onSearch, onAddBookmark }: AppBarProps) {
  const { theme, setTheme, font, setFont } = useThemeFont();

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-neutral-dark-800">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search bookmarks by title..."
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button onClick={onAddBookmark} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Bookmark
        </Button>
        
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}