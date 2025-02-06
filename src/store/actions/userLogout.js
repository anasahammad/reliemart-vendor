import { userActions,  } from '../reducers/userReducer';

// Action creator for user logout
export const logout = () => (dispatch) => {
  // Dispatch the action to reset user information in the Redux store
  dispatch(userActions.resetUserInfo());
  // Remove user information from local storage
  localStorage.removeItem('adminAccount');
};


