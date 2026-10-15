import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postApi } from '../api/post.api';
import { reactionApi } from '../api/reaction.api';
import { useAuth } from '../context/AuthContext';
import { ReadingProgress } from '../components/article/ReadingProgress';
import { StickyAuthorCard } from '../components/article/StickyAuthorCard';
import { FloatingReactionBar } from '../components/article/FloatingReactionBar';
import { CommentSection } from '../components/article/CommentSection';
import { MarkdownRenderer } from '../components/article/MarkdownRenderer';
import { PostDetailSkeleton } from '../components/common/SkeletonLoader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  calculateReadingTime,
  formatDate,
  DEFAULT_AVATAR,
  DEFAULT_COVER,
} from '../utils/helpers';
import { Clock, Eye, Edit3, Trash2, ArrowLeft, Calendar } from 'lucide-react';

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [post, setPost] = useState(null);
  const [likesData, setLikesData] = useState({ likesCount: 0, hasLiked: false });
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Increment views
        postApi.incrementViews(id).catch(() => {});

        // Fetch post
        const postData = await postApi.getPostById(id);
        setPost(postData.post);

        // Fetch likes
        try {
          const likesRes = await reactionApi.getLikes(id);
          const userLiked =
            currentUser &&
            likesRes.likes?.some(
              (l) => l.user?._id === currentUser._id || l.user?._id === currentUser.id
            );
          setLikesData({
            likesCount: likesRes.likesCount || 0,
            hasLiked: !!userLiked,
          });
        } catch {
          // Ignore reaction fetch errors
        }

        // Fetch comments
        try {
          const commentsRes = await reactionApi.getComments(id);
          setComments(commentsRes.comments || []);
        } catch {
          // Ignore comments fetch errors
        }
      } catch (err) {
        setError(err.message || 'Article not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
    window.scrollTo(0, 0);
  }, [id, currentUser]);

  const handleDelete = async () => {
    if (!window.confirm('Are you certain you wish to delete this essay? This action cannot be undone.')) {
      return;
    }
    setIsDeleting(true);
    try {
      await postApi.deletePost(id);
      navigate('/');
    } catch (err) {
      alert(err.message || 'Failed to delete post');
      setIsDeleting(false);
    }
  };

  const scrollToComments = () => {
    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif font-bold text-3xl mb-4 text-zinc-900 dark:text-zinc-100">
          Story Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          The essay you are looking for may have been removed, unlisted, or does not exist.
        </p>
        <Link to="/">
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    );
  }

  const isAuthor =
    currentUser &&
    (currentUser._id === post.author?._id || currentUser.id === post.author?._id);

  const readingTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.createdAt);
  const authorName = post.author?.name || post.author?.username || 'Writer';
  const authorAvatar = post.author?.avatar_image || DEFAULT_AVATAR;

  return (
    <article className="min-h-screen">
      <ReadingProgress />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Breadcrumb & Controls */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Journal
          </Link>

          {/* Author controls: Edit & Delete */}
          {isAuthor && (
            <div className="flex items-center gap-2">
              <Link to={`/edit-post/${post._id}`}>
                <Button variant="outline" size="sm" className="text-xs">
                  <Edit3 className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                isLoading={isDeleting}
                className="text-xs"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge category={post.type}>{post.type || 'ESSAY'}</Badge>
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.18] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link to={`/profile/${post.author?._id || ''}`}>
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-11 h-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
                onError={(e) => {
                  e.target.src = DEFAULT_AVATAR;
                }}
              />
            </Link>
            <div className="text-left">
              <Link
                to={`/profile/${post.author?._id || ''}`}
                className="font-medium text-sm text-zinc-900 dark:text-zinc-100 hover:underline block"
              >
                {authorName}
              </Link>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readingTime}
                </span>
                {post.views > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views} views
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        {post.cover_image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-zinc-200/80 dark:border-zinc-800/80 max-h-[560px] bg-zinc-100 dark:bg-zinc-800">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = DEFAULT_COVER;
              }}
            />
          </div>
        )}

        {/* 2-Column Editorial Grid: Content on Left, Author Sidebar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <MarkdownRenderer content={post.content} />

            {/* Reactions and Share Bar */}
            <FloatingReactionBar
              postId={post._id}
              initialLikesCount={likesData.likesCount}
              initialHasLiked={likesData.hasLiked}
              commentsCount={comments.length}
              onCommentClick={scrollToComments}
            />

            {/* Comments Section */}
            <CommentSection postId={post._id} initialComments={comments} />
          </div>

          {/* Sticky Author Rail (Desktop) */}
          <div className="lg:col-span-4 hidden lg:block">
            <StickyAuthorCard author={post.author} />
          </div>
        </div>
      </div>
    </article>
  );
};
