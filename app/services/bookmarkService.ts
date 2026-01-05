import { Bookmark, bookmarksData } from '@/app/data/bookmark';

export class BookmarkService {
  private static bookmarks = [...bookmarksData.bookmarks];

  static getAllBookmarks(): Bookmark[] {
    return [...this.bookmarks];
  }

  static addBookmark(bookmarkData: Omit<Bookmark, 'id' | 'createdAt' | 'visitCount' | 'lastVisited'>): Bookmark {
    const newBookmark: Bookmark = {
      ...bookmarkData,
      id: `bm-${Date.now()}`,
      createdAt: new Date().toISOString(),
      visitCount: 0,
      lastVisited: null,
      favicon: bookmarkData.favicon || '/images/favicon-32x32.png',
    };
    
    this.bookmarks.push(newBookmark);
    return newBookmark;
  }

  static updateBookmark(id: string, updates: Partial<Bookmark>): Bookmark | null {
    const index = this.bookmarks.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    this.bookmarks[index] = { ...this.bookmarks[index], ...updates };
    return this.bookmarks[index];
  }

  static deleteBookmark(id: string): boolean {
    const index = this.bookmarks.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    this.bookmarks.splice(index, 1);
    return true;
  }
}