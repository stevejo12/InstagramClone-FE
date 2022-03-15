import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import axios from '../../axios';
import { AUTH_ERROR } from '../../redux/actions/types';

import './Profile.css';

const Profile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // get profile data from username
    axios.get(`/user/${username}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('igCloneToken')
      }
    })
      .then((res) => {
        const data = res.data;

        setUser(data.user);
        setPosts(data.posts);
      })
      .catch(err => {
        if (err.message === 'jwt expired') {
          dispatch({
            type: AUTH_ERROR
          })
          history.push('/login')
        }
      })
  }, [username])

  // useEffect(() => {
  //   dispatch(setPageHeader(true));
  // }, [dispatch])

  return (
    <div className="profile">
      <header>
        {/* Profile Picture */}
        <div className="profile__pictureContainer">
          <img src={user?.avatar} alt="" />
        </div>
        {/* Information */}
        <div className="profile__info">
          {/* username */}
          <div className="profile__infoUsername">
            <h2>{user?.username}</h2>
          </div>
          {/* followers following */}
          <div className="profile__infoFollows">
            <ul>
              <li>0 posts</li>
              <li>{user?.followers || 0} followers</li>
              <li>{user?.following || 0} following</li>
            </ul>
          </div>
          {/* Name + text */}
          <div className="profile__infoDescription">
            <h1>{user?.fullname}</h1>
            <span>textarea for profile info</span>
          </div>
        </div>
      </header>
      {/* Posts */}
      <div className="profile__posts">
        {posts.map((post, index) => (
          <div key={index} className="profile__post">
            <img src={post.uri} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;
