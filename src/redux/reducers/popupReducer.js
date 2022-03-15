import { OPEN_POPUP_IMAGE, CLOSE_POPUP_IMAGE, SET_PREV_KEY } from '../actions/types'

const initialState = {
  popupImage: false,
  prevKey: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_POPUP_IMAGE:
      return {
        ...state,
        popupImage: true
      };
    case CLOSE_POPUP_IMAGE:
      return {
        ...state,
        popupImage: false
      };
    case SET_PREV_KEY:
      return {
        ...state,
        prevKey: action.payload
      }
    default:
      return state
  }
}