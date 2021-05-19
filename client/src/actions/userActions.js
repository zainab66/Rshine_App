import Axios from 'axios';
import {USER_SIGNIN_FAIL,USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNOUT,
  USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS, USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL, USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,USER_ACTIVATE_FAIL,USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_SUCCESS,USER_forgotPassword_FAIL,USER_forgotPassword_REQUEST,USER_forgotPassword_SUCCESS,
  USER_resetPassword_FAIL,USER_resetPassword_REQUEST,USER_resetPassword_SUCCESS
} from '../constants/userConstants';
  import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    RESET_CART,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
  } from '../constants/cartConstants';
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post('http://localhost:3001/api/users/signin', { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      console.log('sign',data);

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


export const signout = () => (dispatch) => {
  //localStorage.clear();
   localStorage.removeItem('userInfo');
   //localStorage.removeItem('cartItems');
   localStorage.removeItem('shippingAddress');
   dispatch({ type: USER_SIGNOUT });
   dispatch({ type: RESET_CART });
   document.location.href = '/';
};


export const register = (form) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: form });
  try {
    const { data } = await Axios.post('http://localhost:3001/api/users/register', form);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    //dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    //localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`http://localhost:3001/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`http://localhost:3001/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('http://localhost:3001/api/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`http://localhost:3001/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};



export const activateUser = (token) => async (dispatch) => {
  dispatch({ type: USER_ACTIVATE_REQUEST, payload: {token } });
  try {
    const { data } = await Axios.post('http://localhost:3001/api/users/email-activate', { token });
    //dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    //localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_ACTIVATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ACTIVATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: USER_forgotPassword_REQUEST, payload: { email } });
  try {
    const { data } = await Axios.put('http://localhost:3001/api/users/forget-password', { email});
    console.log('act',data)
    //dispatch({ type: USER_forgotPassword_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_forgotPassword_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const resetPassword = (resetLink,newPass) => async (dispatch) => {
  dispatch({ type: USER_resetPassword_REQUEST, payload: { resetLink,newPass } });
  try {
    const { data } = await Axios.put('http://localhost:3001/api/users/reset-password', { resetLink,newPass});
    console.log('act',data)
    dispatch({ type: USER_resetPassword_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_resetPassword_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
