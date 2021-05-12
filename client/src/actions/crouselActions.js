import Axios from 'axios';

import { Crousel_CREATE_REQUEST,Crousel_CREATE_SUCCESS,Crousel_CREATE_FAIL,
  Crousel_LIST_REQUEST,Crousel_LIST_SUCCESS,Crousel_LIST_FAIL
} from '../constants/crouselConstants';
  

export const addCrousel = (form) => async (dispatch, getState) => {
    dispatch({ type: Crousel_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        'http://localhost:3001/api/crousel/create',
        form,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log('hhh',data)
      dispatch({
        type: Crousel_CREATE_SUCCESS,
        payload: data.crousel,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: Crousel_CREATE_FAIL, payload: message });
    }
  };

  export const listCrousels = () => async (dispatch) =>{
    dispatch({
        type: Crousel_LIST_REQUEST,
 
    });
    try {
        const { data } = await Axios.get('http://localhost:3001/api/crousel');
        dispatch({ type: Crousel_LIST_SUCCESS, payload: data });
    } catch(error){
        dispatch({ type: Crousel_LIST_FAIL, payload: error.message });
    }
};