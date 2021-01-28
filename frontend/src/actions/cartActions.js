import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

  
export const addToCart = (productId, qty,sizeOption,colorOption,option) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/prod/${productId}`);
    console.log("gggg",data)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.productPictures[0].img,
          price: data.price,
          countInStock: data.countInStock,
          product: data._id,
          qty,
          sizeOption,
          colorOption,
          option,
        },
      });
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      )
    };

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};