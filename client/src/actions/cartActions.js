import Axios from 'axios';
import {
  ADD_TO_CART,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  RESET_CART
} from '../constants/cartConstants';
import store from "../store";

// export const addToCart = (productId,qty,colorOption,sizeOption,sizeFirstOption,option,message) => async (dispatch, getState) => {
//     const { data } = await Axios.get(`http://localhost:3001/api/products/prod/${productId}`);
//     console.log("gggg",data)
//     dispatch({
//         type: CART_ADD_ITEM,
//         payload: {
//           name: data.name,
//           image: data.productPictures[0].img,
//           price: data.price,
//           countInStock: data.countInStock,
//           product: data._id,
//           qty,
//           colorOption,
//           sizeOption,
//           sizeFirstOption,
//           option,
//           message
//         },
//       });
//       localStorage.setItem(
//         'cartItems',
//         JSON.stringify(getState().cart.cartItems)
//       )
//     };

// export const removeFromCart = (productId) => (dispatch, getState) => {
//   dispatch({ type: CART_REMOVE_ITEM, payload: productId });
//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
// };

// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
//   localStorage.setItem('shippingAddress', JSON.stringify(data));
// };

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
// };


export const getCartItems = (payload) => {
  return async dispatch => {
    const { userSignin } = store.getState();

    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
      const res = await Axios.post(`http://localhost:3001/api/cart/user/getCartItems`,payload, {
        headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
      });
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems })
        if (cartItems) {
          dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: { cartItems }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const addToCart = (product, newQty) => {
  return async dispatch => {
    const { userSignin } = store.getState();

    const {
      cart: {
        cartItems
      },
    } = store.getState();
    //console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty = newQty) : newQty;
    cartItems[product._id] = {
      ...product,
      qty
    };

    if (userSignin.userInfo) {
      dispatch({ type: ADD_TO_CART_REQUEST });
      const payload = {
        // cartItems: Object.keys(cartItems).map((key, index) => {
        //     return {
        //         quantity: cartItems[key].qty,
        //         product: cartItems[key]._id
        //     }
        // })
        cartItems: [{
          product: product._id,
          quantity: qty
        }]
      };
      console.log(payload);
      const res = await Axios.post(`http://localhost:3001/api/cart/addtocart`, payload, {
        headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
      }
      );
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems(payload));
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    console.log('addToCart::', cartItems);

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: { cartItems }
    });
  }
}



export const updateCart = () => {
  return async dispatch => {
    // const {
    //   userSignin: { userInfo },
    // } = store.getState();
    const { userSignin } = store.getState();

    let cartItems = localStorage.getItem('cart') ?
      JSON.parse(localStorage.getItem('cart')) : null;

    console.log('upppppppppp',cartItems)

    if (userSignin.userInfo) {
      console.log('userSignin.userInfo')

      localStorage.removeItem('cart');
      //dispatch(getCartItems());
      if (cartItems) {
        console.log('cartItems',cartItems)

        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id
            }
          })
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await Axios.post(`http://localhost:3001/api/cart/addtocart`, payload, {
            headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
          });
          if (res.status === 201) {
            dispatch(getCartItems(payload));
          }
        }
      }
    } else {

      if (cartItems) {
        dispatch({
          type: ADD_TO_CART_SUCCESS,
          payload: { cartItems }
        });
      }
    }



  }
}



