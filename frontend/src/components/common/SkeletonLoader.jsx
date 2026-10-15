import React from 'react';

export const PostCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-5 flex flex-col justify-between animate-pulse">
      <div>
        <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4" />
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-1" />
        <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
};

export const PostDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6" />
      <div className="h-12 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded mb-6" />
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="w-full h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-10" />
      <div className="space-y-4">
        <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
};
