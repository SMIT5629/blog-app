import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postApi } from '../api/post.api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { MarkdownRenderer } from '../components/article/MarkdownRenderer';
import {
  ImagePlus,
  ArrowLeft,
  Eye,
  Edit,
  X,
  Upload,
  Sparkles,
} from 'lucide-react';

export const CreateEditPostPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('TECH');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPost, setIsFetchingPost] = useState(isEditing);
  const [error, setError] = useState('');

  const categories = ['TECH', 'LIFESTYLE', 'TRAVEL', 'FOOD', 'OTHER'];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    if (isEditing) {
      const loadPost = async () => {
        try {
          const data = await postApi.getPostById(id);
          const p = data.post;
          if (p) {
            setTitle(p.title || '');
            setContent(p.content || '');
            setType(p.type || 'TECH');
            if (p.cover_image) {
              setCoverPreview(p.cover_image);
            }
          }
        } catch (err) {
          setError(err.message || 'Failed to load post for editing');
        } finally {
          setIsFetchingPost(false);
        }
      };
      loadPost();
    }
  }, [id, isEditing, isAuthenticated, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setCoverImageFile(null);
    setCoverPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('content', content.trim());
    formData.append('type', type);

    if (coverImageFile) {
      formData.append('cover_image', coverImageFile);
    }

    try {
      if (isEditing) {
        await postApi.updatePost(id, formData);
        navigate(`/post/${id}`);
      } else {
        const result = await postApi.createPost(formData);
        const newPostId = result.post?._id || result.post?.id;
        navigate(newPostId ? `/post/${newPostId}` : '/');
      }
    } catch (err) {
      setError(err.message || 'Error publishing post');
      setIsLoading(false);
    }
  };

  if (isFetchingPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-sm text-zinc-500">
        Loading draft...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-[#09090B]">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-30 bg-[#FBFBF9]/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Cancel</span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-xs font-sans text-zinc-400">
              {isEditing ? 'Editing Story' : 'Drafting New Essay'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Preview Toggle */}
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPreviewMode ? (
                <>
                  <Edit className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </>
              )}
            </button>

            {/* Publish Button */}
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              isLoading={isLoading}
              className="rounded-full px-5 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              {isEditing ? 'Save Changes' : 'Publish Story'}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {error && (
          <div className="p-3.5 mb-8 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        {isPreviewMode ? (
          /* Live Preview Mode */
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 shadow-sm animate-in fade-in duration-200">
            <span className="text-[10px] uppercase font-sans tracking-widest text-zinc-400 font-bold">
              Preview • {type}
            </span>
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-zinc-50 mt-2 mb-6">
              {title || 'Untitled Essay'}
            </h1>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover"
                className="w-full max-h-96 object-cover rounded-xl mb-8"
              />
            )}
            <MarkdownRenderer content={content || '*Start typing to see your rendered prose here...*'} />
          </div>
        ) : (
          /* Writing Canvas */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Category and Meta Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-sans">
                Topic:
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setType(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      type === cat
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Image Upload Area */}
            {coverPreview ? (
              <div className="relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 max-h-80 bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 p-2 bg-zinc-900/80 text-white rounded-full hover:bg-zinc-900 transition-colors shadow-md"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl p-8 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 cursor-pointer transition-all">
                <ImagePlus className="w-8 h-8 text-zinc-400 mb-2" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Add a high-resolution cover image
                </span>
                <span className="text-xs text-zinc-400 mt-1">
                  PNG, JPG, or WebP up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            {/* Title Input */}
            <input
              type="text"
              required
              placeholder="Title of your essay..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent font-serif font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-zinc-50 placeholder-zinc-300 dark:placeholder-zinc-700 focus:outline-none tracking-tight leading-tight"
            />

            {/* Markdown Content Area */}
            <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <textarea
                required
                rows={16}
                placeholder="Tell your story... You can use standard Markdown (# Headings, > Quotes, - Lists, `code`)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent font-serif text-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none leading-relaxed resize-y"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
