import Axios from 'axios';
 import { RESET_CART } from '../constants/cartConstants';
import { ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS,GET_USER_ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,GET_USER_ORDER_FAILURE,GET_CUSTOMER_ORDER_REQUEST,GET_CUSTOMER_ORDER_SUCCESS,GET_CUSTOMER_ORDER_FAILURE} from '../constants/orderConstants';

    import store from "../store";


// export const createOrder = (order) => async (dispatch, getState) => {
//     dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
//     try {
//       const {
//         userSignin: { userInfo },
//       } = getState();
//       const { data } = await Axios.post('http://localhost:3001/api/orders', order, {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       });
//       dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      
//     } catch (error) {
//       dispatch({
//         type: ORDER_CREATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

  export const createOrder = (payload) => {
    return async (dispatch) => {
      const { userSignin } = store.getState();

      try {
        const res = await Axios.post(`http://localhost:3001/api/orders/addOrder`, payload, {
          headers: {
            Authorization: `Bearer ${userSignin.userInfo.token}`,
          },
        });
        dispatch({ type:ORDER_CREATE_REQUEST });
        if (res.status === 201) {
          console.log(res);
       
          // const {
          //   order
          // } = res.data

          
          dispatch({ type: ORDER_CREATE_SUCCESS, payload: res.data.order });

          //console.log('ppo', order);
          // dispatch({
          //   type: ORDER_CREATE_SUCCESS,
          //   payload: { order },
          // });   
          
          // dispatch({
          //   type: RESET_CART,
          // });
        } else {
          const { error } = res.data;
          dispatch({
            type: ORDER_CREATE_FAIL,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  
  

  export const getOrders = () => {
    return async (dispatch) => {
      const { userSignin } = store.getState();
      try {
        const res = await Axios.get(`http://localhost:3001/api/orders/getOrders`, {
          headers: {
            Authorization: `Bearer ${userSignin.userInfo.token}`,
          },
        });
        dispatch({ type: GET_USER_ORDER_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { orders } = res.data;
          dispatch({
            type: GET_USER_ORDER_SUCCESS,
            payload: { orders },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: GET_USER_ORDER_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };




















export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type:ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`http://localhost:3001/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};  


export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`http://localhost:3001/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    //  dispatch({ type: CART_EMPTY });
      //localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};


export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('http://localhost:3001/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};
export const listOrderCustmer = () => async (dispatch, getState) => {
  dispatch({ type:  GET_CUSTOMER_ORDER_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('http://localhost:3001/api/orders/getCustomerOrders', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: GET_CUSTOMER_ORDER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type:  GET_CUSTOMER_ORDER_FAILURE, payload: message });
  }
};
export const updateOrder = (payload) => {
  return async (dispatch) => {
    //dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
    const { userSignin } = store.getState();

    try {
      const res = await Axios.post("http://localhost:3001/api/orders/order/update", payload, {
        headers: {
          Authorization: `Bearer ${userSignin.userInfo.token}`,
        },
      });
      console.log(res);
      if (res.status === 201) {
        // dispatch({
        //     type: pageConstants.CREATE_PAGE_SUCCESS,
        //     payload: { page: res.data.page }
        // });
      } else {
        // dispatch({
        //     type: pageConstants.CREATE_PAGE_FAILURE,
        //     payload: { error: res.data.error }
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
};