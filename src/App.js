import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
// Route type
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
// Routes
import NotFound from './routes/NotFound/NotFound';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
//component
import PopupImage from './components/PopupImage/PopupImage';
// styling
import './App.css';
import { loadUser } from './redux/actions/authActions';
import Header from './components/Header/Header';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const popup = useSelector(state => state.popup.popupImage);
  // const page = useSelector(pageSelector);
  // const popupImage = popup.popupImage || false;

  // user not exist = Login Page.
  return (
    <div className="app">
      <Router>
        <PopupImage show={popup} />
        {/* {page.pageHeader ? <Header /> : ''} */}
        <Header />
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/:username" component={Profile} />
          <PublicRoute exact path="/" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}
//RnEpo gpWnf Yx5HN

export default App;
