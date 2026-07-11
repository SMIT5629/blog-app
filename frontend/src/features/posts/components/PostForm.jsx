import { useState } from "react";

// reusable form for both create and edit post
const PostForm = ({ onSubmit, loading, error, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [type, setType] = useState(initialData.type || "OTHER");
    const [coverImage, setCoverImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // use FormData because we have file upload
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("type", type);
        if (coverImage) {
            formData.append("cover_image", coverImage);
        }

        onSubmit(formData);
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            {error && <p className="post-form-error">{error}</p>}

            <p className="post-form-tagline">What's on your mind?</p>

            <div className="post-form-group">
                <label>Title</label>
                <input
                    type="text"
                    className="post-form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
            </div>

            <div className="post-form-group">
                <label>Content</label>
                <textarea
                    className="post-form-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content..."
                    rows={8}
                    required
                />
            </div>

            <div className="post-form-group post-form-group-labeled">
                <label>Cover image (optional)</label>
                <input
                    type="file"
                    className="post-form-file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                />
            </div>

            <div className="post-form-group post-form-group-labeled">
                <label>Type</label>
                <select
                    className="post-form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="TECH">Tech</option>
                    <option value="LIFESTYLE">Lifestyle</option>
                    <option value="TRAVEL">Travel</option>
                    <option value="FOOD">Food</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>

            <button className="post-form-btn" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Publish post"}
            </button>
        </form>
    );
};

export default PostForm;