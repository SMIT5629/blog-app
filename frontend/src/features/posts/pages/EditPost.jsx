import { useParams, useNavigate } from "react-router-dom";
import { useGetPostById, useUpdatePost } from "../hooks/usePosts.js";
import PostForm from "../components/PostForm.jsx";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { post, loading: fetchLoading, error: fetchError } = useGetPostById(id);
    const { handleUpdatePost, loading, error } = useUpdatePost();

    const handleSubmit = async (formData) => {
        const data = await handleUpdatePost(id, formData);
        if (data) {
            navigate(`/posts/${id}`);
        }
    };

    if (fetchLoading) return <p className="post-detail-loading">Loading...</p>;
    if (fetchError) return <p className="post-detail-error">{fetchError}</p>;
    if (!post) return null;

    return (
        <div className="create-post-page">
            <h1 className="create-post-title">Edit Post</h1>
            <PostForm
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                initialData={{
                    title: post.title,
                    content: post.content,
                    type: post.type,
                }}
            />
        </div>
    );
};

export default EditPost;