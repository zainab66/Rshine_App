import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer ,storageReducer} from './reducers/cartReducers';
import {
  productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productSlugReducer, productReviewCreateReducer,

} from './reducers/productReducers';
import { userSigninReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,userListReducer,userDeleteReducer,  userUpdateReducer,

} from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderMineListReducer,CustmerlistOrder } from './reducers/orderReducers';
import { categoryListReducer, categoryCreateReducer, categoryUpdateReducer, categoryDeleteReducer } from './reducers/categoryReducers';
import { crouselCreateReducer,crouselListReducer} from './reducers/crouselReducers';
import { addressReducer } from './reducers/addressReducers';


const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart2: {
    cartItems: localStorage.getItem('cart2') ? JSON.parse(localStorage.getItem('cart2'))
      : [],
  //   shippingAddress: localStorage.getItem('shippingAddress')
  //     ? JSON.parse(localStorage.getItem('shippingAddress'))
  //     : {},
  //   paymentMethod: 'PayPal',

  },
  

};


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  cart2:storageReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  productSlug: productSlugReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  crouselCreate: crouselCreateReducer,
  crouselList:  crouselListReducer,
  addressw: addressReducer,
  orderCustmer:CustmerlistOrder,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)));
export default store;