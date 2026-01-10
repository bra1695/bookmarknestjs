'use client';

import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/UserMenu';

interface AppBarProps {
  onSearch?: (query: string) => void;
  onAddBookmark?: () => void;
}

export function AppBar({ onSearch, onAddBookmark }: AppBarProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-background ">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="lg:hidden" />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search bookmarks by title..."
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-2 lg:ml-0">
        <Button onClick={onAddBookmark} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Bookmark</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}