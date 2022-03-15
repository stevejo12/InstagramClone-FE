import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router';

function NotFound() {
  const user = useSelector(state => state.auth.user);
  return (
    <>
      {user ? <div /> : <Redirect to="/" />}
    </>
  )
}

export default NotFound
