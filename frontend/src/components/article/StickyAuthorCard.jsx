import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { followApi } from '../../api/follow.api';
import { Button } from '../common/Button';
import { DEFAULT_AVATAR } from '../../utils/helpers';
import { UserCheck, UserPlus } from 'lucide-react';

export const StickyAuthorCard = ({ author, initialIsFollowing = false }) => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  if (!author) return null;

  const isSelf = currentUser && (currentUser._id === author._id || currentUser.id === author._id);

  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      window.location.href = '/sign-in';
      return;
    }
    setIsLoading(true);
    try {
      if (isFollowing) {
        await followApi.unfollowUser(author._id);
        setIsFollowing(false);
      } else {
        await followApi.followUser(author._id);
        setIsFollowing(true);
      }
    } catch {
      // If error occurs, toggle optimistic state back
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="sticky top-28 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Link to={`/profile/${author._id}`}>
          <img
            src={author.avatar_image || DEFAULT_AVATAR}
            alt={author.name || author.username}
            className="w-14 h-14 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
            onError={(e) => {
              e.target.src = DEFAULT_AVATAR;
            }}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-sans tracking-widest text-zinc-400 font-bold">
            Written by
          </span>
          <Link to={`/profile/${author._id}`}>
            <h4 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100 hover:underline truncate">
              {author.name || author.username}
            </h4>
          </Link>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            @{author.username}
          </p>
        </div>
      </div>

      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed line-clamp-3">
        {author.bio || 'Contributing essayist and curator on Chronicle. Exploring thoughts and stories.'}
      </p>

      {!isSelf && (
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            variant={isFollowing ? 'outline' : 'primary'}
            size="sm"
            onClick={handleFollowToggle}
            isLoading={isLoading}
            className="w-full text-xs"
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5 mr-1" />
                Follow Author
              </>
            )}
          </Button>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          to={`/profile/${author._id}`}
          className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors uppercase tracking-wider"
        >
          View Full Profile & Articles →
        </Link>
      </div>
    </aside>
  );
};
