import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Avatar, Button } from '@mui/material'

import useOutsideClick from '../../helpers/useOutsideClick'

import axios from '../../axios';
import Popup from '../Popup/Popup';

import './PopupImage.scss';
import { CLOSE_POPUP_IMAGE } from '../../redux/actions/types';


const PopupImage = ({ show }) => {
  const user = useSelector(state => state.auth.user);
  const userInfo = user;
  const ref = useRef();
  const [images, setImages] = useState(false);
  const [captionText, setCaptionText] = useState('');
  const dispatch = useDispatch();

  const closePopup = () => {
    setImages(false);
    setCaptionText('');
    dispatch({
      type: CLOSE_POPUP_IMAGE
    })
  }

  useOutsideClick(ref, () => closePopup());

  const onDragOver = e => {
    e.preventDefault();
  }

  const onDrop = e => {
    e.preventDefault();
    const { dataTransfer: { files } } = e;

    const { length } = files;
    const reader = new FileReader();

    if (length === 0) {
      return false;
    }

    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { type } = files[0];

    if (!fileTypes.includes(type)) {
      alert("File must be jpeg/jpg/png");
      return false;
    }

    reader.readAsDataURL(files[0]);
    reader.onload = loadevt => {
      setImages(loadevt.target.result);
    }
  }

  const onClickBrowse = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    const { type } = files[0];
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!fileTypes.includes(type)) {
      alert("File must be jpeg/jpg/png");
      return false;
    }

    reader.readAsDataURL(files[0]);
    reader.onload = loadevt => {
      setImages(loadevt.target.result);
    }
  }

  const onBackButton = (e) => {
    setImages(false);
    setCaptionText('');
  }

  const onSubmitPost = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('user_id', userInfo._id);
    // formData.append('caption', captionText);
    // formData.append('photo', images);
    const data = {
      "user_id": userInfo._id,
      "caption": captionText,
      "photo": images
    }
    

    axios.post('/post/new', data)
      .then(res => {
        // after image upload done
        // reset all state.
        closePopup();
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Popup
      show={show} 
      closeFn={() => closePopup()}
    >
      <div className="popupImage__container">
        <div className="popupImage__box" ref={ref}>
          <div className="popupImage__boxHeader">
            {images ? 
                <div className="popupImage__backButton">
                  <ArrowBackOutlinedIcon 
                    fontSize="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onBackButton()}
                  />
                </div> 
              : null
            }
            <h1>Create new post</h1>
          </div>
          {images 
            ? 
              <div className="popupImage__postSetup">
                <form encType='multipart/form-data'>
                  <img className="popupImage__picture" src={images} alt="" />
                  <div className="popupImage__postData">
                    <div className="popupImage__userInfo">
                      <Avatar className="popupImage__userAvatar" />
                      {userInfo.username}
                    </div>
                    <div className="popupImage__caption">
                      <textarea 
                        className="popupImage__captionTextArea"
                        value={captionText} 
                        onChange={(e) => setCaptionText(e.target.value)}
                        placeholder="Write a caption..."
                      />
                    </div>
                    <Button 
                      type="submit"
                      onClick={onSubmitPost}
                    >
                      Share
                    </Button>
                  </div>
                </form>
              </div> 
            : 
              <div className="popupImage__uploadImage">
                <div 
                  className="popupImage__dragArea" 
                  onDrop={e => onDrop(e)}
                  onDragOver={e => onDragOver(e)}
                >
                  <div className="popupImage__dragAreaIcon">
                    <InsertPhotoOutlinedIcon />
                  </div>
                  <span className="popupImage__dragAreaText">
                    {` Drag & Drop `}
                  </span>
                  <span className="popupImage__dragAreaText">
                    or <label htmlFor="file-upload" className="popupImage__dragAreaButton">
                      <input
                        style={{display: 'none'}}
                        type="file"
                        accept=".png, .jpg, .jpeg" 
                        id="file-upload"
                        onChange={onClickBrowse}
                      />
                      Browse
                    </label>
                  </span>
                  <span className="popupImage__dragAreaSupport">
                    Supports: JPEG, JPG, and PNG
                  </span>
                </div>
              </div>
          }
        </div>
      </div>
    </Popup>
  )
}

export default PopupImage
