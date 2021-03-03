import Axios from 'axios';

import { Crousel_CREATE_REQUEST,Crousel_CREATE_SUCCESS,Crousel_CREATE_FAIL} from '../constants/crouselConstants';
  

export const addCrousel = (form) => async (dispatch, getState) => {
    dispatch({ type: Crousel_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        'https://backend-rshine.herokuapp.com/api/crousel/create',
        form,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: Crousel_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: Crousel_CREATE_FAIL, payload: message });
    }
  };