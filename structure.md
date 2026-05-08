# Blog Webapp — Backend Architecture
 
## Overview
 
| | |
|---|---|
| Total Endpoints | 22 |
| Route Groups | 6 |
| Controllers | 6 |
| Models | 5 |
| Middleware | 6 |
 
---
 
## API Endpoints
 
### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | Returns JWT access token |
| POST | `/api/auth/logout` | Invalidate refresh token |
| POST | `/api/auth/refresh` | Get new access token |
 
### Posts
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/posts` | Paginated feed |
| GET | `/api/posts/:id` | Single post with like/dislike counts |
| POST | `/api/posts` | Create post (auth required) |
| PUT | `/api/posts/:id` | Update post (owner only) |
| DELETE | `/api/posts/:id` | Delete post (owner or admin) |
 
### Reactions (like / dislike)
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/posts/:id/react` | Toggle like or dislike on post |
| GET | `/api/posts/:id/reactions` | Get like & dislike counts |
| POST | `/api/comments/:id/react` | Like or dislike a comment |
 
### Comments
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/posts/:id/comments` | Get comments (threaded) |
| POST | `/api/posts/:id/comments` | Add comment or reply (auth required) |
| PUT | `/api/comments/:id` | Edit comment (owner only) |
| DELETE | `/api/comments/:id` | Delete comment (owner or admin) |
 
### Follow
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/users/:id/follow` | Follow a user |
| DELETE | `/api/users/:id/follow` | Unfollow a user |
| GET | `/api/users/:id/followers` | Get followers list |
| GET | `/api/users/:id/following` | Get following list |
 
### User Profile
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/users/:id` | Get public profile |
| PATCH | `/api/users/me` | Update own profile (name, bio, avatar) |
 
---
 
## Models
 
### User
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `username` | String | unique |
| `email` | String | unique, lowercase |
| `password` | String | bcrypt hashed |
| `avatar_url` | String | optional |
| `bio` | String | max 200 chars |
| `role` | enum | `user` or `admin` |
| `created_at` | timestamp | auto |
 
### Post
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `author` | ObjectId | ref → User |
| `title` | String | max 200 chars |
| `slug` | String | auto-generated from title |
| `content` | String | full post body |
| `cover_url` | String | optional image |
| `views` | Number | default 0 |
| `created_at` | timestamp | auto |
 
### Comment
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `post_id` | ObjectId | ref → Post |
| `author_id` | ObjectId | ref → User |
| `parent_id` | ObjectId | ref → Comment, null for top-level |
| `body` | String | max 1000 chars |
| `created_at` | timestamp | auto |
 
> `parent_id` self-reference gives you nested/threaded replies without a separate table.
 
### Reaction
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `user_id` | ObjectId | ref → User |
| `target_id` | ObjectId | post or comment ID |
| `target_type` | enum | `post` or `comment` |
| `type` | enum | `LIKE` or `DISLIKE` |
| `created_at` | timestamp | auto |
 
> One model handles both post and comment reactions. Unique index on `user_id + target_id + target_type` prevents duplicate reactions.
 
### Follow
| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | auto |
| `follower_id` | ObjectId | ref → User (who is following) |
| `following_id` | ObjectId | ref → User (who is being followed) |
| `created_at` | timestamp | auto |
 
> Unique index on `follower_id + following_id` prevents duplicate follows.
 
---
