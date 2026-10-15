import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi } from '../api/post.api';
import { EditorialPostCard } from '../components/blog/EditorialPostCard';
import { PostCardSkeleton } from '../components/common/SkeletonLoader';
import { Button } from '../components/common/Button';
import { ArrowLeft, Compass, PenSquare } from 'lucide-react';

export const CategoryExplorePage = () => {
  const { type } = useParams();
  const categoryKey = (type || 'TECH').toUpperCase();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryDescriptions = {
    TECH: 'Dispatches on software architecture, artificial intelligence, craft, and digital systems.',
    LIFESTYLE: 'Meditations on modern living, mindfulness, habits, and contemporary aesthetics.',
    TRAVEL: 'Journeys across borders, architectural landscapes, and cultural explorations.',
    FOOD: 'Essays celebrating culinary heritage, seasonal recipes, and the culture of hospitality.',
    OTHER: 'Free-form perspectives, experimental essays, and philosophical musings.',
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await postApi.getAllPosts();
        const allPosts = data.posts || [];
        const filtered = allPosts.filter(
          (p) => p.type && p.type.toUpperCase() === categoryKey
        );
        setPosts(filtered);
      } catch (err) {
        setError(err.message || 'Failed to load category essays');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryPosts();
    window.scrollTo(0, 0);
  }, [categoryKey]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Topics
        </Link>
      </div>

      {/* Category Hero Banner */}
      <section className="mb-12 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-semibold">
          Topic Archive
        </span>
        <h1 className="font-serif font-extrabold text-4xl sm:text-5xl text-zinc-900 dark:text-zinc-50 mt-2 mb-3">
          {categoryKey.charAt(0) + categoryKey.slice(1).toLowerCase()}
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-sans leading-relaxed">
          {categoryDescriptions[categoryKey] || categoryDescriptions.OTHER}
        </p>
      </section>

      {/* Posts Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <Compass className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100 mb-2">
            No essays in {categoryKey} yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
            Be the author who inaugurates this topic on Chronicle.
          </p>
          <Link to="/create-post">
            <Button variant="primary">
              <PenSquare className="w-4 h-4 mr-2" />
              Write Essay
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <EditorialPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
