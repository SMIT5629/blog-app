# Blog App

A full-stack blogging platform built with the MERN stack — write posts, discover people, and build your profile.

## Live Link 1 - [https://blog-app-flame-zeta.vercel.app/](#)
## Live Link 2 - [https://frontendv2-khaki.vercel.app/](#)


## Features
- **User Authentication**: Sign up and log in to personalize your experience.
- **Write & Publish**: Create, edit, and publish your own blog posts.
- **Read Posts**: Browse and read posts from other users.
- **Profiles**:
  - **View Profile**: See a user's bio and their published posts.
  - **Edit Profile**: Update your own profile details.
- **Discover People**: Find and explore other users on the platform.


## Technologies Used

- **Frontend**:
  - React
- **Backend**:
  - Node.js
  - Express
- **Database**:
  - MongoDB

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-app.git
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables (inside the `server` directory):
   ```makefile
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_port
   ```

4. Run frontend and backend:
   ```bash
   cd server
   npm start

   cd client
   npm start
   ```

## Contributing

- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Make your changes.
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature-branch`).
- Open a pull request.

Feel free to replace any placeholder text with your specific details and make any necessary adjustments.

