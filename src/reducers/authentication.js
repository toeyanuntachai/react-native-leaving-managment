import { SET_LOGGEDIN } from './constants/actionType';

const initialState = {
  isLoggedIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGEDIN:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}
