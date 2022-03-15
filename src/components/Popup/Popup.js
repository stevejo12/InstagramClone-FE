import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './Popup.scss';

const Popup = ({ show = false, closeFn = () => {}, children }) => {
  // make sure user cant scroll when popup is showing.
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show])

  return (
    <div className={`popup__blackscreen ${show ? 'show' : 'hidden'}`}>
      <div className="popup__closeButton">
        <CloseIcon onClick={() => {
          closeFn(false)}} />
      </div>
      {children}
    </div>
  )
}

export default Popup;
