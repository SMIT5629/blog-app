import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../hooks/usePosts.js";
import PostForm from "../components/PostForm.jsx";


import "../styles/posts.css";

const CreatePost = () => {
    const { handleCreatePost, loading, error } = useCreatePost();
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        const data = await handleCreatePost(formData);
        if (data) navigate(`/posts/${data.post._id}`);
    };

    return (
        <div className="home-page">
            <div className="create-post-page">
                <h1 className="create-post-title">Write a Post</h1>
                <PostForm onSubmit={handleSubmit} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default CreatePost;