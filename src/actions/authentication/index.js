import { SET_LOGGEDIN } from '../../reducers/constants/actionType';

export const setLoggedin = isLoggedin => {
  return async dispatch => {
    dispatch({ type: SET_LOGGEDIN, payload: isLoggedin });
  };
};
