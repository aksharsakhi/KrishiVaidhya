import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import NewPostForm from './components/NewPostForm';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:postId" element={<PostDetailPage />} />
              <Route path="/new-post" element={
                <div className="container mx-auto px-4 py-6">
                  <NewPostForm />
                </div>
              } />
            </Routes>
          </main>
          <footer className="bg-green-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>© 2025 FarmConnect - A Community for Farmers</p>
              <p className="text-sm mt-2">Connect, Share, Grow</p>
            </div>
          </footer>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;