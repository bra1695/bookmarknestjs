// components/tags-filter.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  getAllTags, 
  SelectedTags, 
  getBookmarkCountByTags,
  getInitialSelectedTags,
  getSelectedTagNames,
  type TagWithCount 
} from '@/app/services/tagService';
import { bookmarksData } from '@/app/data/bookmark';

interface TagsFilterProps {
  onTagsChange?: (selectedTags: SelectedTags) => void;
  selectedTags?: SelectedTags;
}

export function TagsFilter({ onTagsChange, selectedTags: externalSelectedTags }: TagsFilterProps) {
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [internalSelectedTags, setInternalSelectedTags] = useState<SelectedTags>({});
  
  const selectedTags = externalSelectedTags || internalSelectedTags;
  const setSelectedTags = externalSelectedTags ? (() => {}) : setInternalSelectedTags;

  useEffect(() => {
    const tagsData = getAllTags();
    setTags(tagsData);
    setIsLoading(false);
    
    if (!externalSelectedTags) {
      const initialSelectedTags = getInitialSelectedTags();
      setInternalSelectedTags(initialSelectedTags);
    }
  }, [externalSelectedTags]);

  const handleTagCheckboxChange = (tagName: string, isChecked: boolean) => {
    const updatedTags = {
      ...selectedTags,
      [tagName]: isChecked
    };
    
    setSelectedTags(updatedTags);
    
    if (onTagsChange) {
      onTagsChange(updatedTags);
    }
  };

  const handleSelectAll = () => {
    const allSelected: SelectedTags = {};
    tags.forEach(tag => {
      allSelected[tag.name] = true;
    });
    
    setSelectedTags(allSelected);
    if (onTagsChange) {
      onTagsChange(allSelected);
    }
  };

  const handleClearAll = () => {
    const noneSelected = getInitialSelectedTags();
    
    setSelectedTags(noneSelected);
    if (onTagsChange) {
      onTagsChange(noneSelected);
    }
  };

  const selectedTagNames = getSelectedTagNames(selectedTags);
  const selectedCount = selectedTagNames.length;
  const matchingBookmarksCount = getBookmarkCountByTags(selectedTags);
  const totalBookmarksCount = bookmarksData.bookmarks.length;
  const pinnedCount = bookmarksData.bookmarks.filter(b => b.pinned).length;

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Tags</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-sidebar-accent/20 animate-pulse rounded"></div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <>
      {/* Tags Filter Section */}
      <SidebarGroup className='ml-1'>        
        <SidebarGroupContent>
           <h2 className='font-semibold'>TAGS</h2>
          {/* Tags List */}
          <SidebarMenu>
            {tags.map((tag) => (
              <SidebarMenuItem key={tag.name}>
                <SidebarMenuButton 
                  asChild
                  className="w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex items-center justify-between w-full cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`tag-${tag.name}`}
                        checked={selectedTags[tag.name] || false}
                        onCheckedChange={(checked :any) => 
                          handleTagCheckboxChange(tag.name, checked as boolean)
                        }
                        className="h-4 w-4"
                      />
                      <label 
                        htmlFor={`tag-${tag.name}`}
                        className="cursor-pointer text-sm font-medium"
                      >
                        {tag.name}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs rounded-full px-2 py-1">
                        {tag.count}
                      </Badge>
                      {selectedTags[tag.name] && (
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}