const {
    Crousel_CREATE_REQUEST,Crousel_CREATE_SUCCESS,Crousel_CREATE_FAIL,Crousel_CREATE_RESET
} = require('../constants/crouselConstants');
export const crouselCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case Crousel_CREATE_REQUEST:
        return { loading: true };
      case Crousel_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case Crousel_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case Crousel_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  