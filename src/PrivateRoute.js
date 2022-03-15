import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

function PrivateRoute({ path, component }) {
  const token = useSelector(state => state.auth.token) || localStorage.getItem('igCloneToken');

  return (
    token ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/login" />
    )
  )
}

export default PrivateRoute;
