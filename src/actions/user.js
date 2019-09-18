import { SET_PROFILE } from '../reducers/constants/actionType';

export const setProfile = user => {
  return dispatch => {
    dispatch({ type: SET_PROFILE, payload: user });
  };
};
