import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, Check } from 'lucide-react';
import { reactionApi } from '../../api/reaction.api';
import { useAuth } from '../../context/AuthContext';

export const FloatingReactionBar = ({
  postId,
  initialLikesCount = 0,
  initialHasLiked = false,
  commentsCount = 0,
  onCommentClick,
}) => {
  const { isAuthenticated } = useAuth();
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [isLiking, setIsLiking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      window.location.href = '/sign-in';
      return;
    }
    if (isLiking) return;

    setIsLiking(true);
    const prevLiked = hasLiked;
    const prevCount = likesCount;

    // Optimistic update
    setHasLiked(!prevLiked);
    setLikesCount(prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1);

    try {
      if (prevLiked) {
        await reactionApi.unlikePost(postId);
      } else {
        await reactionApi.likePost(postId);
      }
    } catch {
      // Revert if error
      setHasLiked(prevLiked);
      setLikesCount(prevCount);
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex items-center justify-between py-4 my-8 border-y border-zinc-200 dark:border-zinc-800 text-sm">
      <div className="flex items-center gap-6">

        {/* Like Button */}
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-2 group transition-colors cursor-pointer ${hasLiked
              ? 'text-rose-600 dark:text-rose-500 font-semibold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
          aria-label="Like post"
        >
          <div
            className={`p-2 rounded-full transition-transform duration-200 group-hover:scale-110 ${hasLiked ? 'bg-rose-50 dark:bg-rose-950/40' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform ${hasLiked ? 'fill-current scale-110' : ''
                }`}
            />
          </div>
          <span>{likesCount}</span>
        </button>

        {/* Comments count / link */}
        <button
          onClick={onCommentClick}
          className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 group transition-colors cursor-pointer"
          aria-label="View comments"
        >
          <div className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span>{commentsCount}</span>
        </button>

      </div>

      <div className="flex items-center gap-2">
        {/* Bookmark button */}
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${bookmarked ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'
            }`}
          aria-label="Save story"
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Share article"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
