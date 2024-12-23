import React, { useState, useEffect, useContext } from 'react';
import { UserAuthContext } from '../Context/userAuth'
const Comment = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userId } = useContext(UserAuthContext);

  // Fetch comments when the component loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [blogId]);  // Make sure comments are fetched based on the blogId

  // Handle submitting a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment, userId }),
      });
      const addedComment = await response.json();
      console.log(addedComment)

      if (response.ok) {
        // Directly update the state to include the new comment without re-fetching
        setComments((prevComments) => [...prevComments, addedComment]);
        setNewComment(''); // Clear the input field
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>

      {/* Display the list of comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>
              <strong>{comment.user?.username || 'Anonymous'}</strong>: {comment.content}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-md focus:outline-none"
          required
        ></textarea>
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
