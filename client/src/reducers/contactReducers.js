import {
    USER_CONTACT_FAIL,USER_CONTACT_REQUEST,USER_CONTACT_SUCCESS
  } from '../constants/contactConstants'



export const userContactReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CONTACT_REQUEST:
        return { loading: true };
      case USER_CONTACT_SUCCESS:
        return { loading: false, contact: action.payload };
      case USER_CONTACT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };