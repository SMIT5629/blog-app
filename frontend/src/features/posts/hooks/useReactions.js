import { useState, useEffect } from "react";
import {
    likePost,
    unlikePost,
    getLikes,
    addComment,
    getComments,
    deleteComment,
    editComment
} from "../services/reactions.api";

export const useLike = (postId) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // fetch likes on mount
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const data = await getLikes(postId);
                setLikesCount(data.likesCount);
                setLiked(data.isLiked);
            } catch (err) {
                console.error(err);
            }
        };
        if (postId) fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        setLoading(true);
        try {
            await likePost(postId);
            setLiked(true);
            setLikesCount((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnlike = async () => {
        setLoading(true);
        try {
            await unlikePost(postId);
            setLiked(false);
            setLikesCount((prev) => prev - 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { liked, likesCount, handleLike, handleUnlike, loading };
};


export const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(postId);
                setComments(data.comments);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch comments");
            } finally {
                setLoading(false);
            }
        };
        if (postId) fetchComments();
    }, [postId]);


    const handleAddComment = async (body) => {
        setSubmitting(true);
        try {
            const data = await addComment(postId, body);
            setComments((prev) => [data.comment, ...prev]);
            return data.comment;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add comment");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete comment");
        }
    };

    const handleEditComment = async (commentId, body) => {
        try {
            const data = await editComment(commentId, body);
            setComments((prev) =>
                prev.map((c) => (c._id === commentId ? data.comment : c))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to edit comment");
        }
    };

    return {
        comments,
        loading,
        error,
        submitting,
        handleAddComment,
        handleDeleteComment,
        handleEditComment,
    };
};