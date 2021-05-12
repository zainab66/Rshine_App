import Axios from 'axios';
import {
  ADD_TO_CART,ADD_TO_Storage_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  RESET_CART,REMOVE_CART_ITEM_REQUEST,REMOVE_CART_ITEM_SUCCESS,REMOVE_CART_ITEM_FAILURE
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


// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
//   localStorage.setItem('shippingAddress', JSON.stringify(data));
// };

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
// };


const getCartItems = (payload) => {
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

export const addToCart = (product,qty,price,message,option,colorOption,sizeOption,sizeFirstOption,sizeSecondOption,dentify,name,img,countInStock) => async (dispatch, getState) => {
 // return async dispatch => {
    const { userSignin } = store.getState();
   // const cartItems ={product, qty,price,message,option,colorOption,sizeOption,sizeFirstOption,sizeSecondOption,dentify,name,img,countInStock};
    // const {
    //   cart: { cartItems },
    // } = getState();
    //console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    //const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty = newQty) : newQty;
    // cartItems[product._id] = {
    //   ...product,
    //   qty,
    //   price,
    //   message,
    //   option,
    //   colorOption,
    //   sizeOption,
    //   sizeFirstOption,
    //   sizeSecondOption
    // };

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
          product: product,
          qty: qty,
          price:price,
          message:message ,
          option:option,
          colorOption:colorOption,
          sizeOption:sizeOption,
          sizeFirstOption:sizeFirstOption,
          sizeSecondOption:sizeSecondOption,
          dentify:dentify,
          name:name,
          img:img,
          countInStock:countInStock
        }]
      };
      //console.log('act', payload)

      const res = await Axios.post(`http://localhost:3001/api/cart/addtocart`,payload, {
        headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
      }
      );

     console.log('res',res.data);
      if (res.status === 201) {
        dispatch(getCartItems(payload));
      }
    } else {
    

   // console.log('addToCart::', cartItems);
//const cartItems ={product, qty,price,message,option,colorOption,sizeOption,sizeFirstOption,sizeSecondOption,dentify,name,img,countInStock};
//console.log('act',cartItems)

    dispatch({
      type: ADD_TO_Storage_SUCCESS,
      payload: {product, qty,price,message,option,colorOption,sizeOption,sizeFirstOption,sizeSecondOption,dentify,name,img,countInStock }
    });

    localStorage.setItem(
      'cart2',
      JSON.stringify(getState().cart2.cartItems)
    );
    //localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  }
//}



export const updateCart = () => {
  return async dispatch => {
    // const {
    //   userSignin: { userInfo },
    // } = store.getState();
    const { userSignin } = store.getState();
  const {
      cart2: { cartItems },
    } = store.getState();
    // let cartItems = localStorage.getItem('cart') ?
    //   JSON.parse(localStorage.getItem('cart')) : null;

     console.log('upppppppppp',cartItems)

    if (userSignin.userInfo) {
       console.log('userSignin.userInfo')

       localStorage.removeItem('cart2');
    //   //dispatch(getCartItems());
      if (cartItems) {
        console.log('cartItems',cartItems)

        const payload = {
          cartItems: cartItems.map((key, index) => {
            return {
              product: key.product,
              qty: key.qty,
              price:key.price,
              message:key.message,
              option:key.option,
              colorOption:key.colorOption,
              sizeOption:key.sizeOption,
              sizeFirstOption:key.sizeFirstOption,
              sizeSecondOption:key.sizeSecondOption,
              dentify:key.dentify,
              name:key.name,
              img:key.img,
              countInStock:key.countInStock
            }
          })
        };

        console.log('upload',payload);

        if (cartItems.length > 0) {
          const res = await Axios.post(`http://localhost:3001/api/cart/addtocart`, payload, {
            headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
          });
          if (res.status === 201) {
            dispatch(getCartItems(payload));
          }
        }
      }
     } else {
      console.log('up')

      // if (cartItems) {
      //   dispatch({
      //     type: ADD_TO_Storage_SUCCESS,
      //     payload: { cartItems }
      //   });
      //  }
     }



  }
}



export const removeCartItem = (payload) => {
  return async (dispatch) => {
    const { userSignin } = store.getState();

    try {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST});
      const res = await Axios.post(`http://localhost:3001/api/cart/removeItem`, { payload }, {
        headers: { Authorization: `Bearer ${userSignin.userInfo.token}` },
      });
      console.log('remov',res);

      if (res.status === 202) {
        dispatch({ type:REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type:REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export { getCartItems };

export const removeFromCart = (productId) => (dispatch, getState) => {
  console.log({ type: CART_REMOVE_ITEM, payload: productId })
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cart2', JSON.stringify(getState().cart2.cartItems));
  
};
