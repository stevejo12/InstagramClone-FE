import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Input } from '@mui/material';

import axios from '../../axios';

import './Login.css';
import { LOGIN_SUCCESS } from '../../redux/actions/types';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (event) => {
    event.preventDefault();

    axios.post('/user/login', {
      email: email,
      password: password
    })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })

        // add redirect to homepage
        history.push('/home')
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
        alert(err.response?.data?.message);
      })
  }

  return (
    <div className="login">
      <div className="login__box">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="login__image"
        />
        <form className="login__form">
          <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit"
            onClick={signIn}
          >
            Sign In
          </Button>
        </form>
        <div className="login__divider">
          <div className="login__dividerLine"></div>
          <div className="login__dividerText">OR</div>
          <div className="login__dividerLine"></div>
        </div>
        {/* Add alternative Sign In with Google */}
      </div>
      <div className="login__signUp">
        <p>Don't have an account? <a href="/register" className="login__signUpText">Sign up</a></p>
      </div>
    </div>
  )
}

export default Login;
