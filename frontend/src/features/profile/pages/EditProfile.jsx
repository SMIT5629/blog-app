import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useUpdateProfile } from "../hooks/useProfile.js";
import { FiCamera } from "react-icons/fi";

const EditProfile = () => {
    const { user, login } = useAuthContext();
    const { handleUpdateProfile, loading, error, success } = useUpdateProfile();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [name, setName] = useState(user?.name || "");
    const [username, setUsername] = useState(user?.username || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [website, setWebsite] = useState(user?.website || "");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(user?.avatar_image || "");
    const [activeTab, setActiveTab] = useState("profile");

    const avatarLetter = user?.username?.charAt(0).toUpperCase();
    const BIO_MAX = 160;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (name)     formData.append("name", name);
        if (username) formData.append("username", username);
        if (bio)      formData.append("bio", bio);
        if (website)  formData.append("website", website);
        if (avatar)   formData.append("avatar_image", avatar);

        const data = await handleUpdateProfile(formData);
        if (data) {
            login(data.user);
            navigate(`/profile/${user._id || user.id}`);
        }
    };

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-layout">

                {/* ── Sidebar ── */}
                <aside className="edit-sidebar">

                    {/* Avatar preview card */}
                    <div className="edit-sidebar-card edit-avatar-card">
                        <div className="edit-avatar-wrap">
                            {preview ? (
                                <img src={preview} className="edit-avatar-img" alt="avatar" />
                            ) : (
                                <div className="edit-avatar-placeholder">{avatarLetter}</div>
                            )}
                            <button
                                type="button"
                                className="edit-avatar-overlay"
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Change photo"
                            >
                                 <FiCamera size={11} color="#fff" />
                            </button>
                            <input
                                ref={fileInputRef}
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="edit-avatar-input"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <p className="edit-sidebar-name">{name || user?.name}</p>
                        <p className="edit-sidebar-username">@{username || user?.username}</p>
                        <button
                            type="button"
                            className="edit-photo-btn"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Change photo
                        </button>
                    </div>

                    {/* Settings nav */}
                    <nav className="edit-sidebar-nav">
                        <button
                            type="button"
                            className={`edit-nav-item ${activeTab === "profile" ? "active" : ""}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            <span className="icon-user" aria-hidden="true" />
                            Profile
                        </button>
                        <button
                            type="button"
                            className={`edit-nav-item ${activeTab === "password" ? "active" : ""}`}
                            onClick={() => setActiveTab("password")}
                        >
                            <span className="icon-lock" aria-hidden="true" />
                            Password
                        </button>
                    </nav>
                </aside>

                {/* ── Main panel ── */}
                <main className="edit-main">
                    <form onSubmit={handleSubmit}>

                        {activeTab === "profile" && (
                            <>
                                {/* Public info */}
                                <div className="edit-section-card">
                                    <p className="edit-section-title">Public info</p>

                                    {error   && <p className="edit-msg edit-msg-error">{error}</p>}
                                    {success && <p className="edit-msg edit-msg-success">Profile updated!</p>}

                                    <div className="edit-field-row">
                                        <div className="edit-form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="edit-form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                id="username"
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="username"
                                            />
                                            <span className="edit-field-hint">
                                                inkwell.app/@{username || "username"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="edit-form-group">
                                        <label htmlFor="bio">Bio</label>
                                        <textarea
                                            id="bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
                                            placeholder="Tell something about yourself"
                                            rows={3}
                                        />
                                        <span className="edit-char-count">
                                            {bio.length} / {BIO_MAX}
                                        </span>
                                    </div>

                                    <div className="edit-form-group">
                                        <label htmlFor="website">Website</label>
                                        <input
                                            id="website"
                                            type="url"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            placeholder="https://yoursite.com"
                                        />
                                    </div>
                                </div>

                                {/* Account — email read-only */}
                                <div className="edit-section-card">
                                    <p className="edit-section-title">Account</p>
                                    <div className="edit-form-group">
                                        <label>Email address</label>
                                        <div className="edit-readonly-field">
                                            <span className="icon-mail" aria-hidden="true" />
                                            {user?.email}
                                            <span className="edit-readonly-badge">Read-only</span>
                                        </div>
                                        <span className="edit-field-hint">
                                            Contact support to change your email.
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "password" && (
                            <div className="edit-section-card">
                                <p className="edit-section-title">Change password</p>
                                <div className="edit-form-group">
                                    <label htmlFor="current-pw">Current password</label>
                                    <input id="current-pw" type="password" placeholder="••••••••" />
                                </div>
                                <div className="edit-form-group">
                                    <label htmlFor="new-pw">New password</label>
                                    <input id="new-pw" type="password" placeholder="••••••••" />
                                </div>
                                <div className="edit-form-group">
                                    <label htmlFor="confirm-pw">Confirm new password</label>
                                    <input id="confirm-pw" type="password" placeholder="••••••••" />
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="edit-section-card edit-actions-card">
                            <button
                                type="button"
                                className="edit-btn-danger"
                                onClick={() => {/* TODO: delete account */}}
                            >
                                Delete account
                            </button>
                            <div className="edit-actions-right">
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
                                    {loading ? "Saving…" : "Save changes"}
                                </button>
                            </div>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    );
};

export default EditProfile;