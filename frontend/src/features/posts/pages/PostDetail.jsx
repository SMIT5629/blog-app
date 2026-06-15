import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPostById, useIncrementViews } from "../hooks/usePosts.js";
import CommentSection from "../components/CommentSection.jsx";
import LikeButton from "../components/LikeButton.jsx";
import SuggestedPosts from "../components/SuggestedPost.jsx";

const PostDetail = () => {
    const { id } = useParams();
    const { post, loading, error } = useGetPostById(id);
    const { handleIncrementViews } = useIncrementViews();
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        if (post?.views !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setViewCount(post.views);
        }
    }, [post?.views]);

    useEffect(() => {
        if (!post?._id) return;
        const sessionKey = `post-viewed-${post._id}`;
        if (sessionStorage.getItem(sessionKey)) return;
        sessionStorage.setItem(sessionKey, "true");
        const updateViews = async () => {
            const data = await handleIncrementViews(post._id);
            if (typeof data?.views === "number") setViewCount(data.views);
        };
        updateViews();
    }, [handleIncrementViews, post?._id]);

    if (loading) return <p className="post-detail-loading">Loading...</p>;
    if (error) return <p className="post-detail-error">{error}</p>;
    if (!post) return null;

    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="post-detail-page">

            {/* ── Title ── */}
            <h1 className="post-detail-title">{post.title}</h1>

            {/* ── Author row ── */}
            <div className="post-detail-author-row">
                <Link to={`/profile/${post.author?._id}`} className="post-detail-avatar-link">
                    {post.author?.avatar_image ? (
                        <img
                            src={post.author.avatar_image}
                            className="post-detail-avatar"
                            alt={post.author.name}
                        />
                    ) : (
                        <div className="post-detail-avatar-placeholder">
                            {post.author?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </Link>
                <div className="post-detail-author-info">
                    <div className="post-detail-author-name-row">
                        <Link to={`/profile/${post.author?._id}`} className="post-detail-author-name">
                            {post.author?.name}
                        </Link>
                    </div>
                    <div className="post-detail-author-meta">
                        <span>{formattedDate}</span>
                        <span className="post-detail-dot">·</span>
                        <span>
                            <i className="ti ti-eye" aria-hidden="true"></i> {viewCount} views
                        </span>
                    </div>
                </div>
                <div className="post-detail-action-right">
                    <LikeButton postId={post._id} />
                </div>
            </div>



            {/* ── Cover image ── */}
            {post.cover_image && (
                <img
                    className="post-detail-img"
                    src={post.cover_image}
                    alt={post.title}
                />
            )}

            {/* ── Content ── */}
            <div className="post-detail-content">
                {post.content}
            </div>

            {/* ── Comments ── */}
            <CommentSection postId={post._id} />

            {/* ── Suggested ── */}
            <div className="post-detail-suggested">
                <SuggestedPosts excludePostId={post._id} type={post.type} />
            </div>

        </div>
    );
};

export default PostDetail;