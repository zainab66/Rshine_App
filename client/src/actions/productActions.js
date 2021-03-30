import {  PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,} from '../constants/productConstants';
import Axios from 'axios';
import {  PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS,PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,GET_PRODUCTS_BY_SLUG,DELETE_PRODUCT_BY_ID_REQUEST,DELETE_PRODUCT_BY_ID_SUCCESS,DELETE_PRODUCT_BY_ID_FAILURE} from '../constants/productConstants';
  import store from "../store";

export const listProducts = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST,
 
    });
    try {
        const { data } = await Axios.get('http://localhost:3001/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error){
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
      const { data } = await Axios.get(`http://localhost:3001/api/products/prod/${productId}`);
      console.log(data)
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const addProduct = (form) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        'http://localhost:3001/api/products/create',
        form,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
  };


  export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`http://localhost:3001/api/products/${product._id}`, product, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };



  // export const getProductsBySlug = (slug) => async (dispatch) => {
  //   // dispatch({ type: PRODUCT_Slug_REQUEST  });
    
  //     const {data} = await Axios.get(`/api/products/productes/${slug}`);
  //     console.log('ok',data)
  //       dispatch({ type: GET_PRODUCTS_BY_SLUG, payload: data });
   
  //     dispatch({
  //       type: PRODUCT_Slug_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
    
  // };

  export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await Axios.get(`http://localhost:3001/api/products/productes/${slug}`);
        console.log('oooo',res)
        if (res.status === 200) {
            dispatch({
                type:GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        } else {
            // dispatch({
            //     type: 
            // })
        }
    }
}

export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `https://backend-rshine.herokuapp.com/api/products/${productId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};



export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_PRODUCT_BY_ID_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_PRODUCT_BY_ID_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type:DELETE_PRODUCT_BY_ID_FAILURE, payload: message });
  }
};

