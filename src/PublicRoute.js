import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

function PublicRoute({ path, component }) {
  const user = useSelector(state => state.auth.user);

  return (
    user ? (
      <Redirect to="/home" />
    ) : (
      <Route path={path} component={component} />
    )
  )
}

export default PublicRoute;
