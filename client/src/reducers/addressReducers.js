import {
    GET_USER_ADDRESS_REQUEST,GET_USER_ADDRESS_SUCCESS,GET_USER_ADDRESS_FAILURE,
    ADD_USER_ADDRESS_REQUEST,ADD_USER_ADDRESS_SUCCESS, ADD_USER_ADDRESS_FAILURE
     
  } from '../constants/addressConstants';
  

const initState = {
    address: [],
    error: null,
    loading: false
};


  export const addressReducer = (state =initState, action) => {      
  switch (action.type) {
    case GET_USER_ADDRESS_REQUEST:
      return { loading: true};
    case GET_USER_ADDRESS_SUCCESS:
      return {  loading: false, address: action.payload.address};
    case GET_USER_ADDRESS_FAILURE:
      return {  loading: false, error: action.payload.error };

      case ADD_USER_ADDRESS_REQUEST:
        return { loading: true};
      case ADD_USER_ADDRESS_SUCCESS:
        return {  loading: false, address: action.payload.address};
      case ADD_USER_ADDRESS_FAILURE:
        return {  loading: false, error: action.payload.error };


    default:
      return state;
  }
};     
