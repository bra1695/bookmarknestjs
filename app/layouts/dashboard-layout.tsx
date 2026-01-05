// components/dashboard-layout.tsx
'use client';

import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TagsFilter } from "@/components/tags-filter";
import { SelectedTags } from "@/app/services/tagService";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Bookmark, 
  Settings, 
  Star,
  Search,
  Plus
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({});

  const handleTagsChange = (tags: SelectedTags) => {
    setSelectedTags(tags);
    // You can pass this up to a parent component or use a context
    console.log('Selected tags changed:', tags);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BM</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">BookMark</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Search */}
          <div className="px-2 py-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search bookmarks..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="px-2 py-2 space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Bookmark className="h-4 w-4" />
              <span>All Bookmarks</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Star className="h-4 w-4" />
              <span>Pinned</span>
            </Button>
          </div>

          {/* Tags Filter Component */}
          <TagsFilter 
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />

          {/* Add New Bookmark */}
          <div className="px-2 py-4">
            <Button className="w-full gap-3">
              <Plus className="h-4 w-4" />
              Add Bookmark
            </Button>
          </div>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-2 py-3">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}