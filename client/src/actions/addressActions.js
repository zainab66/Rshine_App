import {
    GET_USER_ADDRESS_REQUEST,GET_USER_ADDRESS_SUCCESS,GET_USER_ADDRESS_FAILURE, ADD_USER_ADDRESS_REQUEST,ADD_USER_ADDRESS_SUCCESS
  } from '../constants/addressConstants';
  import Axios from 'axios';
  import store from "../store";



export const getAddress = (payload) => {
    return async dispatch => {
        const { userSignin } = store.getState();

        try{
            const res = await Axios.post(`http://localhost:3001/api/address/user/getaddress`,payload, {
                headers: { Authorization: `Bearer ${userSignin.userInfo.token}` }
              });
            dispatch({ type: GET_USER_ADDRESS_REQUEST });
            if(res.status === 200){
                const {
                    userAddress: {address}
                } = res.data;
                dispatch({
                    type: GET_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addAddress = (payload) => {
  return async dispatch => {
    const { userSignin } = store.getState();

      try{
          const res = await Axios.post(`http://localhost:3001/api/address/create`, { payload }, {
            headers: { Authorization: `Bearer ${userSignin.userInfo.token}` }
          });
          dispatch({ type: ADD_USER_ADDRESS_REQUEST });
          if(res.status === 201){
              console.log(res);
              const {
                  address: {
                      address
                  }
              } = res.data.address;         
              
              console.log("zz",res.data.address);

              dispatch({
                  type: ADD_USER_ADDRESS_SUCCESS,
                  payload: { address }
              });
          }else{
              const { error } = res.data;
              dispatch({
                  type: ADD_USER_ADDRESS_REQUEST,
                  payload: { error }
              });
          }
      }catch(error){
          console.log(error);
      }
  }
} 
            
