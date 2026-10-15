import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { reactionApi } from '../../api/reaction.api';
import { Button } from '../common/Button';
import { formatDate, DEFAULT_AVATAR } from '../../utils/helpers';
import { MessageSquare, Trash2, Edit2, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommentSection = ({ postId, initialComments = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [error, setError] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isAuthenticated) {
      window.location.href = '/sign-in';
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const data = await reactionApi.makeComment(postId, newComment.trim());
      // Re-fetch comments or add newly created comment
      const newCommentObj = data.comment || {
        _id: Date.now().toString(),
        comment: newComment.trim(),
        createdAt: new Date().toISOString(),
        user: {
          _id: user._id || user.id,
          username: user.username,
          avatar_image: user.avatar_image,
        },
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    } catch (err) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await reactionApi.deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError(err.message || 'Failed to delete comment');
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.comment);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      await reactionApi.editComment(commentId, editingText.trim());
      setComments(
        comments.map((c) => (c._id === commentId ? { ...c, comment: editingText.trim() } : c))
      );
      setEditingCommentId(null);
      setEditingText('');
    } catch (err) {
      setError(err.message || 'Failed to update comment');
    }
  };

  return (
    <section id="comments-section" className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
        <h3 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100">
          Responses ({comments.length})
        </h3>
      </div>

      {error && (
        <div className="p-3 mb-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-700 dark:text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* New Comment Box */}
      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="mb-10">
          <div className="flex items-start gap-3">
            <img
              src={user?.avatar_image || DEFAULT_AVATAR}
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
              onError={(e) => {
                e.target.src = DEFAULT_AVATAR;
              }}
            />
            <div className="flex-1">
              <textarea
                rows={3}
                required
                placeholder="Share your thoughts on this essay..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none shadow-sm"
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  isLoading={isSubmitting}
                  disabled={!newComment.trim()}
                >
                  Publish Response
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-6 mb-10 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            Join the conversation. Sign in to share your thoughts and participate in discussions.
          </p>
          <Link to="/sign-in">
            <Button variant="primary" size="sm">
              Sign In to Respond
            </Button>
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-500 italic py-6 text-center">
            No responses yet. Be the first to spark the discussion.
          </p>
        ) : (
          comments.map((item) => {
            const isOwner =
              user &&
              (user._id === item.user?._id ||
                user.id === item.user?._id ||
                user.username === item.user?.username);

            return (
              <div
                key={item._id}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/70 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.user?.avatar_image || DEFAULT_AVATAR}
                      alt={item.user?.username || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                      onError={(e) => {
                        e.target.src = DEFAULT_AVATAR;
                      }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        @{item.user?.username || 'anonymous'}
                      </p>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {isOwner && (
                    <div className="flex items-center gap-1">
                      {editingCommentId !== item._id && (
                        <>
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                            title="Edit response"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(item._id)}
                            className="p-1 text-zinc-400 hover:text-rose-600 transition-colors"
                            title="Delete response"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {editingCommentId === item._id ? (
                  <div className="mt-2">
                    <textarea
                      rows={2}
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingCommentId(null)}
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleSaveEdit(item._id)}
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap pl-11">
                    {item.comment}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
