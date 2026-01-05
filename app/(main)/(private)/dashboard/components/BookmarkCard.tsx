import { Bookmark } from "@/app/data/bookmark";
import { Pin, MoreVertical, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (bookmarkId: string) => void;
}

export default function BookmarkCard({ bookmark, onEdit, onDelete }: BookmarkCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div 
        className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow p-4 relative"
      >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <Image
            src={bookmark.favicon}
            alt={`${bookmark.title} favicon`}
            width={40}
            height={40}
            className="rounded-sm border p-1 shadow-sm"
          />
          <div>
            <h3 className="font-semibold text-lg">{bookmark.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {bookmark.url}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          {showMenu && (
            <div className="absolute right-0 top-8 w-40 bg-popover border rounded-md shadow-md p-2 z-10">
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    onEdit(bookmark);
                    setShowMenu(false);
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  onClick={() => {
                    setShowDeleteDialog(true);
                    setShowMenu(false);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {bookmark.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {bookmark.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
        <span>Visits: {bookmark.visitCount}</span>
        <div className="flex items-center gap-2">
          <span>
            {new Date(bookmark.createdAt).toLocaleDateString()}
          </span>
          {bookmark.pinned && (
            <Pin className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          )}
        </div>
      </div>
      </div>
      
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => onDelete(bookmark.id)}
        bookmarkTitle={bookmark.title}
      />
    </>
  );
}