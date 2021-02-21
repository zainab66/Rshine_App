import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
import store from "../store";
import {
  ADD_TO_CART_REQUEST,ADD_TO_CART,
  ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, RESET_CART,
} from '../constants/cartConstants';
  
export const addToCart = (productId, qty,sizeOption,colorOption,option,message) => async (dispatch, getState) => {
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
          message,
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

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
// };



export const addToCart2 = (product,qty1) => {
  return async dispatch => {
      const { cartItems } = store.getState().cart;
      //console.log('action::products', products);
      //const product = action.payload.product;
      //const products = state.products;
      //const qty = cartItems[product._id].qty ;
     // console.log('count',qty)
    
     const qty = cartItems[product._id]
     &&(cartItems[product._id].qty = qty1);

      cartItems[product._id] = {
          ...product,
          qty
      };
      console.log('cartItems[product._id]',cartItems[product._id].qty)
      console.log('qty',qty)
      console.log('qty1',qty1)


      localStorage.setItem('cart', JSON.stringify(cartItems));

      dispatch({
          type: ADD_TO_CART,
          payload: { cartItems }
      });
  }
}



export const updateCart = () => {
  return async dispatch => {
      const cartItems = localStorage.getItem('cart') ?
          JSON.parse(localStorage.getItem('cart')) : null;

      if(cartItems){
          dispatch({
              type: ADD_TO_CART,
              payload: { cartItems }
          });
      }

  }
} 