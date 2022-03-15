import { combineReducers } from 'redux';
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import popupReducer from './popupReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  popup: popupReducer
});