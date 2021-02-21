import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

import {
  ADD_TO_CART_REQUEST,ADD_TO_CART,
  ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, RESET_CART,
} from '../constants/cartConstants';
export const cartttReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.product === item.product);
        if (existItem) {
          return {
            ...state,
            error: '',
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          };
        } else {
          return { ...state, error: '', cartItems: [...state.cartItems, item] };
        }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
    }; 
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };  
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };    
    default:
        return state;
    }
  };

// const initState = {
//     cartItems: {
//         // 123: {
//         //     _id: 123,
//         //     name: 'Samsung mobile',
//         //     img: 'some.jpg',
//         //     price: 200,
//         //     qty: 1,
//         // }
//     },
//     updatingCart: false,
//     error: null
// };


//   export const cartttReducer = (state = initState, action) => {
//     switch (action.type) {
     
//       case ADD_TO_CART:
//         return { loading: false,  cartItems: action.payload.cartItems};
   
      
//       default:
//         return state;
//     }
//   };      
   