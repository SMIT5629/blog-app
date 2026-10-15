import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { PostDetailPage } from './pages/PostDetailPage';
import { CreateEditPostPage } from './pages/CreateEditPostPage';
import { ProfilePage } from './pages/ProfilePage';
import { CategoryExplorePage } from './pages/CategoryExplorePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Application Shell */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="post/:id" element={<PostDetailPage />} />
              <Route path="profile/:id" element={<ProfilePage />} />
              <Route path="category/:type" element={<CategoryExplorePage />} />
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Distraction-Free Write / Edit Studio */}
            <Route path="create-post" element={<CreateEditPostPage />} />
            <Route path="edit-post/:id" element={<CreateEditPostPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
