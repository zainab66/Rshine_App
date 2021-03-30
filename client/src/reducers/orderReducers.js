import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,  ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,GET_USER_ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,GET_USER_ORDER_FAILURE,GET_CUSTOMER_ORDER_REQUEST,GET_CUSTOMER_ORDER_SUCCESS,GET_CUSTOMER_ORDER_FAILURE} from '../constants/orderConstants';

   
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true, };
    case ORDER_CREATE_SUCCESS:
      return { success: true, order: action.payload,loading: false,
      };
    case ORDER_CREATE_FAIL:
      return { error: action.payload.error,loading: false,
      };

      case GET_USER_ORDER_REQUEST:
        return { loading: true, };
      case GET_USER_ORDER_SUCCESS:
        return { order: action.payload,loading: false,
        };
      case GET_USER_ORDER_FAILURE:
        return { error: action.payload.error,loading: false,
        };


    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};    


export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};


export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CustmerlistOrder = (state = { CustomerOrders: [] }, action) => {
  switch (action.type) {
    case GET_CUSTOMER_ORDER_REQUEST:
      return { loading: true };
    case GET_CUSTOMER_ORDER_SUCCESS:
      return { loading: false, CustomerOrders: action.payload };
    case GET_CUSTOMER_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
