import React, { useEffect, useState } from 'react'
import { Button, Input } from '@mui/material';

import axios from '../../axios';

import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERRORS, REGISTER_FAILED, REGISTER_SUCCESS } from '../../redux/actions/types';
import { returnErrors } from '../../redux/actions/errorActions';

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const errorMessage = error.message;
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error.id === 'REGISTER_FAILED') {
      alert(errorMessage.message);
      dispatch({
        type: CLEAR_ERRORS
      })
    }
  }, [error])

  const signUp = (event) => {
    event.preventDefault();

    axios.post('/user/register', {
      email: email,
      password: password,
      fullname: fullname,
      username: username
    })
      .then((res) => {
        if (res.status === 201) {
          const message = res.data?.message;
          alert(message);

          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
          })
         
          // redirect to home
          // history.push('/home')
        }
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAILED'))
        dispatch({
          type: REGISTER_FAILED
        })
      })
  }

  return (
    <div className="register">
      <div className="register__box">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="register__image"
        />
        <form className="register__form">
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
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
            onClick={signUp}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <div className="register__signIn">
        <p>Have an account? <a href="/login" className="register__signInText">Log in</a></p>
      </div>
    </div>
  )
}

export default Register;
