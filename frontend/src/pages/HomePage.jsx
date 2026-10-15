import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postApi } from '../api/post.api';
import { HeroFeaturedCard } from '../components/blog/HeroFeaturedCard';
import { EditorialPostCard } from '../components/blog/EditorialPostCard';
import { CategoryFilterPills } from '../components/blog/CategoryFilterPills';
import { PostCardSkeleton } from '../components/common/SkeletonLoader';
import { Sparkles, TrendingUp, Compass, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await postApi.getAllPosts();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err.message || 'Failed to load stories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'ALL' ||
      (post.type && post.type.toUpperCase() === activeCategory.toUpperCase());

    const matchesSearch =
      !searchQuery ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.username?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Editorial Header Motto */}
      <section className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Curated Essays & Ideas</span>
        </div>
        <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.15]">
          A canvas for essays, ideas, and human perspective.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
          Thoughtfully written commentary exploring software craft, modern culture, culinary heritage, and travel chronicles.
        </p>
      </section>

      {/* Category Pills Bar */}
      <section className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4">
        <CategoryFilterPills
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono shrink-0">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'} published
        </div>
      </section>

      {/* Error state */}
      {error && (
        <div className="p-4 mb-8 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-sm text-center">
          {error}. Make sure the backend server is running on port 3000.
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div>
          <div className="w-full h-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100 mb-2">
            No essays found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
            {searchQuery
              ? `No stories matched your search "${searchQuery}". Try a different keyword.`
              : `There are currently no essays in the ${activeCategory} category. Be the first to author one!`}
          </p>
          <Link to="/create-post">
            <Button variant="primary" size="md">
              <PenTool className="w-4 h-4 mr-2" />
              Write First Story
            </Button>
          </Link>
        </div>
      ) : (
        /* Content Display */
        <div>
          {/* Featured Hero Card for Lead Story */}
          {featuredPost && <HeroFeaturedCard post={featuredPost} />}

          {/* Grid of Remaining Stories */}
          {gridPosts.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <h3 className="text-xs uppercase font-sans tracking-widest font-bold text-zinc-700 dark:text-zinc-300">
                  More From the Archives
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                  <EditorialPostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
