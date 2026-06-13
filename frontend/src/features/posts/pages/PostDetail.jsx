import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPostById, useIncrementViews } from "../hooks/usePosts.js";
import "../styles/posts.css";
import CommentSection from "../components/CommentSection.jsx";
import LikeButton from "../components/LikeButton.jsx";

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
            if (typeof data?.views === "number") {
                setViewCount(data.views);
            }
        };

        updateViews();
    }, [handleIncrementViews, post?._id]);

    if (loading) return <p className="post-detail-loading">Loading...</p>;
    if (error) return <p className="post-detail-error">{error}</p>;
    if (!post) return null;

    return (
        <div className="post-detail-page">
            {post.cover_image && (
                <img
                    className="post-detail-img"
                    src={post.cover_image}
                    alt={post.title}
                />
            )}
            <div className="post-detail-body">
                <p className="post-detail-author">@{post.author?.username}</p>
                <h1 className="post-detail-title">{post.title}</h1>

                <div className="post-detail-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span><i className="ti ti-eye" aria-hidden="true"></i> {viewCount} views</span>
                </div>

                <div className="post-detail-content">{post.content}</div>

                <LikeButton postId={post._id} />
            </div>

            <CommentSection postId={post._id} />
        </div>
    );
};

export default PostDetail;
