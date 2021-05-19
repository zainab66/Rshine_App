import Axios from 'axios';
import {
    USER_CONTACT_FAIL,USER_CONTACT_REQUEST,USER_CONTACT_SUCCESS
  } from '../constants/contactConstants';



  export const contact = (email, name,subject,message) => async (dispatch) => {
    dispatch({ type: USER_CONTACT_REQUEST, payload: { email, name,subject,message } });
    try {
      const { data } = await Axios.post('http://localhost:3001/api/contact', { email, name,subject,message });
      dispatch({ type: USER_CONTACT_SUCCESS, payload: data });
      console.log('contact',data)
    } catch (error) {
      dispatch({
        type: USER_CONTACT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
