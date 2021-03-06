import {
  ADD_TO_CART_REQUEST,ADD_TO_Storage_SUCCESS,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  RESET_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM
} from '../constants/cartConstants';

// export const cartReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;
//       const existItem = state.cartItems.find((x) => x.product === item.product);
//       if (existItem) {
//         return {
//           ...state,
//           error: '',
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return { ...state, error: '', cartItems: [...state.cartItems, item] };
//       }
//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         error: '',
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };
//     case CART_SAVE_SHIPPING_ADDRESS:
//       return { ...state, shippingAddress: action.payload };
//     case CART_SAVE_PAYMENT_METHOD:
//       return { ...state, paymentMethod: action.payload };
//     case CART_ADD_ITEM_FAIL:
//       return { ...state, error: action.payload };
//     case CART_EMPTY:
//       return { ...state, error: '', cartItems: [] };
//     default:
//       return state;
//   }
// };

const initState = {
  cartItems:[]
    // 123: {
    //     _id: 123,
    //     name: 'Samsung mobile',
    //     img: 'some.jpg',
    //     price: 200,
    //     qty: 1,
    // }
  ,
  updatingCart: false,
  error: null
};

// export const cartReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case ADD_TO_CART_SUCCESS:
//       const item = action.payload.cartItems;
//       const existItem = state.cartItems.find((x) => x.product === item.product);
//       if (existItem) {
//         return {
//           ...state,
//           error: '',
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return { ...state, error: '', cartItems: [...state.cartItems, item] };
//       }
//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         error: '',
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };
  
//     default:
//       return state;
//   }
// };
export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {  ...state,
        updatingCart: true };
    case ADD_TO_CART_SUCCESS:
      return {  ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false };
    case ADD_TO_CART_FAILURE:
      return {   ...state,
        updatingCart: false,
        error: action.payload.error };
    case RESET_CART:
      return { ...initState};
    default:
      return state;
  }
};





export const storageReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_Storage_SUCCESS:
      const item = action.payload;
      console.log('item',item)

      const existItem = state.cartItems.find((x) => x.dentify === item.dentify);
      if (existItem) {
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.dentify === existItem.dentify ? item : x
          ),
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.dentify !== action.payload),
      };
   
    default:
      return state;
  }
};














// export const cartDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CART_REMOVE_ITEM:
//       return { loading: true };

//     // case PRODUCT_DELETE_RESET:
//     //   return {};
//     default:
//       return state;
//   }
// };