import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

import axios from '../../axios';

import './Post.css';

function Post({ postId, postOwnerInfo, imageURL, caption }) {
  const user = useSelector(state => state.auth.user);
  const userId = user._id;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // set comments based on a post id
    if (postId) {
      axios.get(`/comment/${postId}`).then((res) => {
        const dataComments = res.data?.data;

        if (Array.isArray(dataComments)) {
          setComments(dataComments);
        }
      })
    }
  }, [postId])

  // add comment to the database
  const postComment = (event) => {
    event.preventDefault();

    const data = {
      user_id: userId,
      comment: comment
    }

    // set axios post for comment
    axios.post(`/comment/new/${postId}`, data)
      .then(res => {
        // add the comment manually -> try to get the result back from the backend probably
        // setComments([...comments, data])
      })

    // reset the comment text input
    setComment('');
  }

  return (
    <div className="post">
      {/* Header=> Avatar username */}
      <div className="post__header">
        <Avatar 
          className="post__avatar"
          alt={postOwnerInfo.username}
          src={postOwnerInfo.avatar}
        />
        <h3>{postOwnerInfo.username}</h3>
      </div>
      {/* Image */}
      <img
        className="post__image"
        src={imageURL}
        alt=""
      />
      {/* username + caption */}
      <h4 className="post__text"><strong>{postOwnerInfo.username}</strong> {caption}</h4>

      {comments.map((comment, key) => {
        return (
          <p key={key} className="post__comments">
            <strong>{comment.user_id?.username}</strong> {comment.comment}
          </p>
        )
      })
      }
      
      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default Post
