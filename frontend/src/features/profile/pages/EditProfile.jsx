import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useUpdateProfile } from "../hooks/useProfile.js";
import "../styles/profile.css";

const EditProfile = () => {
    const { user, login } = useAuthContext();
    const { handleUpdateProfile, loading, error, success } = useUpdateProfile();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(user?.avatar_image || "");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file)); 
    };
}

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (name) formData.append("name", name);
        if (username) formData.append("username", username);
        if (email) formData.append("email", email);
        if (bio) formData.append("bio", bio);
        if (avatar) formData.append("avatar_image", avatar); // must match multer field name

        const data = await handleUpdateProfile(formData);
        if (data) {
            login(data.user); // update user in context
            navigate(`/profile/${user._id || user.id}`);
        }
    };

    const avatarLetter = user?.username?.charAt(0).toUpperCase();

    return (
        <div className="edit-profile-page">
            <h1 className="edit-profile-title">Edit Profile</h1>

            <form className="edit-profile-form" onSubmit={handleSubmit}>

                {/* avatar preview + upload */}
                <div className="edit-avatar-section">
                    {preview ? (
                        <img src={preview} className="edit-avatar-img" alt="avatar" />
                    ) : (
                        <div className="edit-avatar-placeholder">{avatarLetter}</div>
                    )}
                    <div>
                        <label className="edit-avatar-label" htmlFor="avatar">
                            Change photo
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="edit-avatar-input"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                {error && <p className="edit-profile-error">{error}</p>}
                {success && <p className="edit-profile-success">Profile updated!</p>}

                <div className="edit-form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="edit-form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>

                <div className="edit-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>

                <div className="edit-form-group">
                    <label>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell something about yourself"
                        rows={4}
                    />
                </div>

                <div className="edit-profile-btns">
                    <button
                        type="button"
                        className="edit-btn-cancel"
                        onClick={() => navigate(`/profile/${user._id || user.id}`)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="edit-btn-save"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;