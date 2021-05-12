const {
  Crousel_CREATE_REQUEST,Crousel_CREATE_SUCCESS,Crousel_CREATE_FAIL,Crousel_CREATE_RESET,
  Crousel_LIST_REQUEST,Crousel_LIST_SUCCESS,Crousel_LIST_FAIL
} = require('../constants/crouselConstants');

export const crouselCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case Crousel_CREATE_REQUEST:
      return { loading: true };
    case Crousel_CREATE_SUCCESS:
      return { loading: false, success: true, crousel: action.payload };
    case Crousel_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case Crousel_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const crouselListReducer = (  state = { loading: true, crousels: []},
  action) =>{
  switch (action.type) {
      case Crousel_LIST_REQUEST:
          return { loading: true };
        case Crousel_LIST_SUCCESS:
          return { loading: false, crousels: action.payload };
        case Crousel_LIST_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    };
