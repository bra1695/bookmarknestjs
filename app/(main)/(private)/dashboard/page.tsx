// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SelectedTags, getBookmarksBySelectedTags } from "@/app/services/tagService";
import { Bookmark } from "@/app/data/bookmark";
import BookmarkCard from './components/BookmarkCard';
import { AppBar } from '@/components/AppBar';
import { SidebarWithTags } from '@/components/sidebar-with-tags';
import { BookmarkDialog } from '@/components/BookmarkDialog';
import { BookmarkService } from '@/app/services/bookmarkService';

export default function HomePage() {
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({});
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentView, setCurrentView] = useState<'home' | 'archived'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showBookmarkDialog, setShowBookmarkDialog] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();

  useEffect(() => {
    // Load all bookmarks on component mount
    const loadedBookmarks = BookmarkService.getAllBookmarks();
    setAllBookmarks(loadedBookmarks);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    
    // Filter bookmarks based on selected tags
    let filteredBookmarks = allBookmarks;
    
    // Apply tag filtering if any tags are selected
    const selectedTagNames = Object.keys(selectedTags).filter(tag => selectedTags[tag]);
    if (selectedTagNames.length > 0) {
      filteredBookmarks = allBookmarks.filter(bookmark =>
        selectedTagNames.some(tag => bookmark.tags.includes(tag))
      );
    }
    
    // Filter by view (home shows non-archived, archived shows archived)
    filteredBookmarks = filteredBookmarks.filter(bookmark => 
      currentView === 'home' ? !bookmark.isArchived : bookmark.isArchived
    );
    
    // Filter by search query if provided
    if (searchQuery.trim()) {
      filteredBookmarks = filteredBookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setBookmarks(filteredBookmarks);
      setIsLoading(false);
    }, 300);
  }, [selectedTags, searchQuery, currentView, allBookmarks]);

  const handleTagsChange = (tags: SelectedTags) => {
    setSelectedTags(tags);
  };

  const handleAddBookmark = () => {
    setEditingBookmark(undefined);
    setShowBookmarkDialog(true);
  };

  const handleEditBookmark = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setShowBookmarkDialog(true);
  };

  const handleDeleteBookmark = (bookmarkId: string) => {
    const success = BookmarkService.deleteBookmark(bookmarkId);
    if (success) {
      const updatedBookmarks = BookmarkService.getAllBookmarks();
      setAllBookmarks(updatedBookmarks);
    }
  };

  const handleSaveBookmark = (bookmarkData: Partial<Bookmark>) => {
    if (editingBookmark) {
      // Update existing bookmark
      BookmarkService.updateBookmark(editingBookmark.id, bookmarkData);
    } else {
      // Add new bookmark
      BookmarkService.addBookmark({
        title: bookmarkData.title || '',
        url: bookmarkData.url || '',
        favicon: '/images/favicon-32x32.png',
        description: bookmarkData.description || '',
        tags: bookmarkData.tags || [],
        pinned: false,
        isArchived: false,
      });
    }
    
    // Refresh bookmarks list
    const updatedBookmarks = BookmarkService.getAllBookmarks();
    setAllBookmarks(updatedBookmarks);
  };

  return (
    <SidebarWithTags 
      currentView={currentView}
      onViewChange={setCurrentView}
      selectedTags={selectedTags}
      onTagsChange={handleTagsChange}
    >
      <div className="flex flex-col h-full">
        <AppBar 
          onSearch={setSearchQuery}
          onAddBookmark={handleAddBookmark}
        />
        
        <div className="p-6 flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {currentView === 'home' ? 'Bookmarks' : 'Archived Bookmarks'}
            </h1>
            <p className="text-muted-foreground">
              {bookmarks.length} bookmarks found
            </p>
          </div>

          {/* Bookmarks display */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg border p-4 animate-pulse">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bookmark) => (
                <BookmarkCard 
                  key={bookmark.id} 
                  bookmark={bookmark} 
                  onEdit={handleEditBookmark}
                  onDelete={handleDeleteBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <BookmarkDialog
        open={showBookmarkDialog}
        onOpenChange={setShowBookmarkDialog}
        bookmark={editingBookmark}
        onSave={handleSaveBookmark}
      />
    </SidebarWithTags>
  );
}