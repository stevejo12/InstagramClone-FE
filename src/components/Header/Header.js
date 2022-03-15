import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './Header.css';
import { useHistory } from 'react-router';
import { OPEN_POPUP_IMAGE, SET_PREV_KEY } from '../../redux/actions/types';

const Header = () => {
  const user = useSelector(state => state.auth.user);
  const popup = useSelector(state => state.popup);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  // when popup shown then closed.
  // make sure active index is on the previous pointer
  useEffect(() => {
    if (!popup.popupImage) {
      setActiveIndex(popup.prevKey)
    }
  }, [popup.popupImage, popup.prevKey])

  const handleClickIcon = (event, key, callFn = () => {}) => {
    event.preventDefault();
    callFn();
    setActiveIndex(key);
  }

  const handleMoveToProfile = () => {
    const username = user.username || '';

    if (username) {
      history.push(`/${username}`)
    }
  }

  const openPopup = () => {
    const currentKey = activeIndex;
    dispatch({
      type: SET_PREV_KEY,
      payload: currentKey
    })
    dispatch({
      type: OPEN_POPUP_IMAGE
    })
  }

  const iconItems = [
    {
      id: 0,
      component: <HomeIcon />,
      alternativeComponent: <HomeOutlinedIcon />,
      onClick: () => {
        history.push('/home')
      }
    },
    {
      id: 1,
      component: <SendIcon />,
      alternativeComponent: <SendOutlinedIcon />,
      onClick: () => {}
    },
    {
      id: 2,
      component: <AddBoxIcon />,
      alternativeComponent: <AddBoxOutlinedIcon />,
      onClick: (prevIndex) => {openPopup(prevIndex)}
    },
    {
      id: 3,
      component: <ExploreIcon />,
      alternativeComponent: <ExploreOutlinedIcon />,
      onClick: () => {}
    },
    {
      id: 4,
      component: <FavoriteIcon />,
      alternativeComponent: <FavoriteBorderIcon />,
      onClick: () => {}
    }
  ]

  return (
    user ? (
      <div className="header">
        {/* Left Side */}
        <div className="header__left">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
            className="header__image"
          />
        </div>
        {/* Middle */}
        <div className="header__middle">
          <div className="header__search">
            <SearchIcon className="header__searchIcon" />
          </div>
          <input className="header__input" type="text" placeholder="Search" />
        </div>
        {/* Right */}
        <div className="header__right">
          {iconItems.map((icon, key) => {
            return ( 
              <div className="header__iconContainer" key={key} onClick={(e) => handleClickIcon(e, key, icon.onClick)}>
                { key === activeIndex ? icon.component : icon.alternativeComponent }
              </div>
            )
          })}
          <Avatar className={`header__avatar`} onClick={() => handleMoveToProfile()} />
        </div>
      </div>
    ) : (
      <div></div>
    )
  )
}

export default Header;