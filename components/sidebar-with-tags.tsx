// components/sidebar-with-tags.tsx
'use client';

import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Archive
} from "lucide-react";
import { SelectedTags } from "@/app/services/tagService";
import { TagsFilter } from "./tags-filter";
import Logo from './Logo';

interface SidebarWithTagsProps {
  children: React.ReactNode;
  onViewChange?: (view: 'home' | 'archived') => void;
  currentView?: 'home' | 'archived';
  onTagsChange?: (tags: SelectedTags) => void;
  selectedTags?: SelectedTags;
}

export function SidebarWithTags({ children, onViewChange, currentView = 'home', onTagsChange, selectedTags: externalSelectedTags }: SidebarWithTagsProps) {
  const [internalSelectedTags, setInternalSelectedTags] = useState<SelectedTags>({});
  
  const selectedTags = externalSelectedTags || internalSelectedTags;
  const handleTagsChange = onTagsChange || setInternalSelectedTags;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
             <Logo />
          </SidebarHeader>

          <SidebarContent className='overflow-x-hidden'>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-1">
                  <Button 
                    variant={currentView === 'home' ? 'default' : 'ghost'} 
                    className="w-full justify-start gap-3"
                    onClick={() => onViewChange?.('home')}
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Button>
                  <Button 
                    variant={currentView === 'archived' ? 'default' : 'ghost'} 
                    className="w-full justify-start gap-3"
                    onClick={() => onViewChange?.('archived')}
                  >
                    <Archive className="h-4 w-4" />
                    <span>Archived</span>
                  </Button>
                    
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Directly render TagsFilter here */}
            <TagsFilter 
              selectedTags={selectedTags}
              onTagsChange={handleTagsChange}
            />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}