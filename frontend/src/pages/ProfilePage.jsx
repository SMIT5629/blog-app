import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userApi } from '../api/user.api';
import { followApi } from '../api/follow.api';
import { useAuth } from '../context/AuthContext';
import { EditorialPostCard } from '../components/blog/EditorialPostCard';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { DEFAULT_AVATAR } from '../utils/helpers';
import {
  UserCheck,
  UserPlus,
  Edit3,
  BookOpen,
  Users,
  Camera,
  X,
  Check,
} from 'lucide-react';

export const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser, refreshUser } = useAuth();
  const profileId = id === 'me' ? currentUser?._id || currentUser?.id : id;

  const [profileData, setProfileData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [error, setError] = useState('');

  // Edit profile modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatarFile, setEditAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [editError, setEditError] = useState('');

  const fetchProfile = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await userApi.getUserProfile(profileId);
      setProfileData(data);

      // Check following status if not self
      if (currentUser && profileId && currentUser._id !== profileId && currentUser.id !== profileId) {
        try {
          const followersRes = await followApi.getFollowers(profileId);
          const followed = followersRes.followers?.some(
            (f) => f.follower?._id === currentUser._id || f.follower?._id === currentUser.id
          );
          setIsFollowing(!!followed);
        } catch {
          // Ignore follow query failure
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchProfile();
    }
  }, [profileId, currentUser]);

  const isSelf =
    currentUser &&
    (currentUser._id === profileId || currentUser.id === profileId);

  const handleFollowToggle = async () => {
    if (!currentUser) {
      window.location.href = '/sign-in';
      return;
    }
    setIsFollowLoading(true);
    try {
      if (isFollowing) {
        await followApi.unfollowUser(profileId);
        setIsFollowing(false);
        setProfileData((prev) => ({
          ...prev,
          followersCount: Math.max(0, (prev?.followersCount || 1) - 1),
        }));
      } else {
        await followApi.followUser(profileId);
        setIsFollowing(true);
        setProfileData((prev) => ({
          ...prev,
          followersCount: (prev?.followersCount || 0) + 1,
        }));
      }
    } catch (err) {
      alert(err.message || 'Error updating follow status');
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleOpenEditModal = () => {
    setEditName(profileData?.user?.name || '');
    setEditBio(profileData?.user?.bio || '');
    setAvatarPreview(profileData?.user?.avatar_image || '');
    setEditAvatarFile(null);
    setEditError('');
    setIsEditModalOpen(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setEditError('');

    const formData = new FormData();
    if (editName.trim()) formData.append('name', editName.trim());
    if (editBio !== undefined) formData.append('bio', editBio.trim());
    if (editAvatarFile) formData.append('avatar_image', editAvatarFile);

    try {
      await userApi.updateProfile(formData);
      await refreshUser();
      await fetchProfile();
      setIsEditModalOpen(false);
    } catch (err) {
      setEditError(err.message || 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto mb-2 animate-pulse" />
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto animate-pulse" />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif font-bold text-3xl mb-4 text-zinc-900 dark:text-zinc-100">
          User Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{error || 'This user does not exist.'}</p>
        <Link to="/">
          <Button variant="primary">Explore Essays</Button>
        </Link>
      </div>
    );
  }

  const { user: profileUser, followersCount = 0, followingCount = 0, posts = [] } = profileData;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Profile Header Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 mb-12 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={profileUser?.avatar_image || DEFAULT_AVATAR}
              alt={profileUser?.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700 shadow-md"
              onError={(e) => {
                e.target.src = DEFAULT_AVATAR;
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {profileUser?.name || 'Writer'}
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                  @{profileUser?.username}
                </p>
              </div>

              {/* Actions */}
              <div>
                {isSelf ? (
                  <Button variant="outline" size="sm" onClick={handleOpenEditModal}>
                    <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant={isFollowing ? 'outline' : 'primary'}
                    size="sm"
                    onClick={handleFollowToggle}
                    isLoading={isFollowLoading}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                        Follow
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mb-6 font-sans">
              {profileUser?.bio || 'Essayist and writer. Contemplating ideas across design, society, and engineering.'}
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-sm">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{posts.length}</span>
                <span className="text-zinc-500">Stories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{followersCount}</span>
                <span className="text-zinc-500">Followers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{followingCount}</span>
                <span className="text-zinc-500">Following</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Published Stories Feed */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100">
            Published Stories ({posts.length})
          </h2>
          {isSelf && (
            <Link to="/create-post">
              <Button variant="primary" size="sm" className="text-xs">
                + New Story
              </Button>
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
              {isSelf
                ? 'You have not published any stories yet. The canvas awaits.'
                : 'This author has not published any essays yet.'}
            </p>
            {isSelf && (
              <Link to="/create-post">
                <Button variant="primary" size="sm">
                  Write Your First Essay
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <EditorialPostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">
                Edit Author Profile
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-3 mb-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs">
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Avatar Uploader */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={avatarPreview || DEFAULT_AVATAR}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                  />
                  <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                    Profile Photo
                  </label>
                  <label className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer underline">
                    Upload new portrait
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <Input
                label="Full Name"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Bio / Literary Intro
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Share a short summary about your focus and interests..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSavingProfile}
                >
                  Save Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
