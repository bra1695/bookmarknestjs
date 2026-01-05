

import { bookmarksData, type Bookmark } from "../data/bookmark";

export interface TagWithCount {
  name: string;
  count: number;
}

export type SelectedTags = Record<string, boolean>;

export function getAllTags(): TagWithCount[] {
  const allTags: string[] = [];
  bookmarksData.bookmarks.forEach(bookmark => {
    allTags.push(...bookmark.tags);   
  });

  const tagCounts: Record<string, number> = {};
  allTags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  const tagsWithCounts: TagWithCount[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

  return tagsWithCounts;
}

export function getUniqueTags(): string[] {
  const allTags = getAllTags();
  return allTags.map(tag => tag.name);
}

export function getBookmarksBySelectedTags(selectedTags: SelectedTags): Bookmark[] {
  const selectedTagNames = Object.keys(selectedTags).filter(tag => selectedTags[tag]);
  
  if (selectedTagNames.length === 0) {
    return bookmarksData.bookmarks;
  }
  
  return bookmarksData.bookmarks.filter(bookmark => {
    return selectedTagNames.some(tag => bookmark.tags.includes(tag));
  });
}

export function getBookmarkCountByTags(selectedTags: SelectedTags): number {
  return getBookmarksBySelectedTags(selectedTags).length;
}

export function getInitialSelectedTags(): SelectedTags {
  const tags = getAllTags();
  const initialTags: SelectedTags = {};
  tags.forEach(tag => {
    initialTags[tag.name] = false;
  });
  return initialTags;
}

export function getSelectedTagNames(selectedTags: SelectedTags): string[] {
  return Object.keys(selectedTags).filter(tag => selectedTags[tag]);
}

export function getBookmarksByTagName(tagName: string): Bookmark[] {
  return bookmarksData.bookmarks.filter(bookmark => 
    bookmark.tags.includes(tagName)
  );
}