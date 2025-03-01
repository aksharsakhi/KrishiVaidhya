import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { Comment } from '../types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments }) => {
  const [commentText, setCommentText] = useState('');
  const { addComment } = usePosts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-start space-x-3">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <div>
                  <p className="font-medium">{comment.userName}</p>
                  <p className="text-gray-500 text-xs">{comment.createdAt}</p>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;