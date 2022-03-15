import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
//
import axios from '../../axios';
import Post from '../../components/Post/Post'

import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // retrieving all the posts for homepage.
    axios.get('/post/allPosts', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('igCloneToken')
      }
    }).then((res) => {
      const data = res.data?.data;

      if (Array.isArray(data)) {
        setPosts(data.map(post => ({
          id: post._id,
          post: {
            imageURL: post.uri,
            postOwnerInfo: post.user_id,
            caption: post.caption
          }
        })))
      }
    }).catch(err => {
      if (err.message === 'jwt expired') {
        history.push('/login')
      }
    })
  }, []);

  // useEffect(() => {
  //   dispatch(setPageHeader(true));
  // }, [dispatch])

  return (
    <div className="home">
      {/* Posts */}
      <div className="home__posts">
        {posts.map(({id, post}) => (
          <Post
            postId={id}
            key={id}
            imageURL={post.imageURL} 
            postOwnerInfo={post.postOwnerInfo}
            caption={post.caption}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
