import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { calculateReadingTime, formatDate, DEFAULT_AVATAR, DEFAULT_COVER } from '../../utils/helpers';
import { Clock, Eye, ArrowRight } from 'lucide-react';

export const EditorialPostCard = ({ post }) => {
  if (!post) return null;

  const readingTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.createdAt);
  const authorName = post.author?.name || post.author?.username || 'Writer';
  const authorAvatar = post.author?.avatar_image || DEFAULT_AVATAR;

  return (
    <article className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg">
      
      {/* Cover Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Link to={`/post/${post._id}`}>
          <img
            src={post.cover_image || DEFAULT_COVER}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              e.target.src = DEFAULT_COVER;
            }}
          />
        </Link>
        <div className="absolute top-3 left-3">
          <Badge category={post.type}>{post.type || 'STORY'}</Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mb-2.5 font-mono">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime}
            </span>
          </div>

          <Link to={`/post/${post._id}`}>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 leading-snug line-clamp-2 mb-2 transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {post.content ? post.content.replace(/[#*`_]/g, '').slice(0, 140) + '...' : ''}
          </p>
        </div>

        {/* Footer: Author info & read indicator */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <Link
            to={`/profile/${post.author?._id || ''}`}
            className="flex items-center gap-2.5 group/author"
          >
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
              onError={(e) => {
                e.target.src = DEFAULT_AVATAR;
              }}
            />
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover/author:underline truncate max-w-[120px]">
              {authorName}
            </span>
          </Link>

          <Link
            to={`/post/${post._id}`}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white flex items-center gap-1"
          >
            <span>Read</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </article>
  );
};
