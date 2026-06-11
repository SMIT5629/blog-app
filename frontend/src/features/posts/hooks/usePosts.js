import { useState, useEffect } from "react";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../services/posts.api";

// hook for getting all posts (used in Home page)
export const useGetAllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data.posts);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return { posts, loading, error };
};

// hook for getting single post (used in PostDetail page)
export const useGetPostById = (id) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data.post);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch post");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchPost();
    }, [id]);

    return { post, loading, error };
};

// hook for creating a post (used in CreatePost page)
export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreatePost = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createPost(formData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return { handleCreatePost, loading, error };
};

// hook for deleting a post (used in PostCard)
export const useDeletePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeletePost = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await deletePost(id);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete post");
        } finally {
            setLoading(false);
        }
    };

    return { handleDeletePost, loading, error };
};

// hook for updating a post (used in EditPost page)
export const useUpdatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdatePost = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await updatePost(id, formData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update post");
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdatePost, loading, error };
};