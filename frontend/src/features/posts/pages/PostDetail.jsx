import { useParams } from "react-router-dom";
import { useGetPostById } from "../hooks/usePosts.js";
import "../styles/posts.css";

const PostDetail = () => {
    const { id } = useParams();
    const { post, loading, error } = useGetPostById(id);

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
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span><i className="ti ti-eye" aria-hidden="true"></i> {post.views} views</span>
                </div>

                <div className="post-detail-content">{post.content}</div>
            </div>
        </div>
    );
};

export default PostDetail;