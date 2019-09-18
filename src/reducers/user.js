import { SET_PROFILE } from './constants/actionType';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
