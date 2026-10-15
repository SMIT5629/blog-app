import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { calculateReadingTime, formatDate, DEFAULT_AVATAR, DEFAULT_COVER } from '../../utils/helpers';
import { Eye, Clock, ArrowUpRight } from 'lucide-react';

export const HeroFeaturedCard = ({ post }) => {
  if (!post) return null;

  const readingTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.createdAt);
  const authorName = post.author?.name || post.author?.username || 'Staff Writer';
  const authorAvatar = post.author?.avatar_image || DEFAULT_AVATAR;

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Cover Image */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={post.cover_image || DEFAULT_COVER}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.src = DEFAULT_COVER;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 z-10">
            <Badge category={post.type}>{post.type || 'FEATURED'}</Badge>
          </div>
        </div>

        {/* Content details */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="hidden lg:flex items-center gap-2 mb-4">
              <span className="text-xs uppercase font-sans tracking-widest text-zinc-500 font-bold">
                Cover Story
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Badge category={post.type}>{post.type || 'FEATURED'}</Badge>
            </div>

            <Link to={`/post/${post._id}`}>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-100 leading-tight mb-4 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6 font-sans leading-relaxed">
              {post.content ? post.content.replace(/[#*`_]/g, '').slice(0, 220) + '...' : ''}
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              
              {/* Author info */}
              <Link
                to={`/profile/${post.author?._id || ''}`}
                className="flex items-center gap-3 group/author"
              >
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 group-hover/author:ring-2 group-hover/author:ring-zinc-400 transition-all"
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover/author:underline">
                    {authorName}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {formattedDate}
                  </p>
                </div>
              </Link>

              {/* Read Time & CTA */}
              <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="hidden sm:flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime}
                </span>
                {post.views > 0 && (
                  <span className="hidden sm:flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views}
                  </span>
                )}
                <Link
                  to={`/post/${post._id}`}
                  className="w-8 h-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Read article"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
