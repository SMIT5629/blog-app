# Blog App

A full-stack blogging platform built with the MERN stack — write posts, discover people, and build your profile.

## Live Link - [https://blog-app-flame-zeta.vercel.app/](#)


## Features
- **User Authentication**: Sign up and log in to personalize your experience.
- **Write & Publish**: Create, edit, and publish your own blog posts.
- **Read Posts**: Browse and read posts from other users.
- **Profiles**:
  - **View Profile**: See a user's bio and their published posts.
  - **Edit Profile**: Update your own profile details.
- **Discover People**: Find and explore other users on the platform.

## Screenshots

| Login Page                        | Register Page                      |
|-----------------------------------|-------------------------------------|
| <img src="https://github.com/user-attachments/assets/51b3d786-d8c4-4918-8549-feaf7c2be9fb" alt="Login Page" width="300"> | <img src="https://github.com/user-attachments/assets/af337980-1b35-49d7-a15d-1c5e3752896d" alt="Register Page" width="300"> |

| Home Page                         | Blog Feed                          |
|-----------------------------------|-------------------------------------|
| <img src="https://github.com/user-attachments/assets/61d2ed1b-7edc-4eb9-be44-0984d9b1e9cb" alt="Home Page" width="300"> | <img src="https://github.com/user-attachments/assets/eaf76c89-d995-4dda-8884-750c26bd1e89" alt="Blog Feed" width="300"> |

| Post View Page                    | Edit Post Page                     |
|-----------------------------------|-------------------------------------|
| <img src="https://github.com/user-attachments/assets/4c882484-57fb-4891-9b66-5acf27736bd7" alt="Post View Page" width="300"> | <img src="https://github.com/user-attachments/assets/6edd967b-5de8-4383-9974-711148e41940" alt="Edit Post Page" width="300"> |

| Discover People Page              | View Profile Page                  |
|-----------------------------------|-------------------------------------|
| <img src="https://github.com/user-attachments/assets/d343cc75-79e2-43e2-8b7b-70d830eea0b8" alt="Discover People Page" width="300"> | <img src="https://github.com/user-attachments/assets/1bb87401-f9ec-40a7-8b55-89c60d843252" alt="View Profile Page" width="300"> |

| Edit Profile Page                 |                                     |
|-----------------------------------|-------------------------------------|
| <img src="https://github.com/user-attachments/assets/04fc1258-a533-4b17-bd04-5de023a7ca63" alt="Edit Profile Page" width="300"> |  |

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

