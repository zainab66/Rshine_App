const { Category_LIST_REQUEST,
  Category_LIST_SUCCESS,
  Category_LIST_FAIL,
  Category_CREATE_REQUEST,
  Category_CREATE_SUCCESS,
  Category_CREATE_FAIL,Category_UPDATE_REQUEST,Category_UPDATE_SUCCESS,Category_UPDATE_FAIL,Category_DELETE_REQUEST,Category_DELETE_SUCCESS,Category_DELETE_FAIL
} = require('../constants/categoryConstants');


export const categoryListReducer = (  state = { loading: true, categories: [] },
    action) =>{
    switch (action.type) {
        case Category_LIST_REQUEST:
            return { loading: true };
          case Category_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
            
          case Category_LIST_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
        
      };



export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case Category_CREATE_REQUEST:
      return { loading: true };
    case Category_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case Category_CREATE_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
};      


export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case Category_DELETE_REQUEST:
      return { loading: true };
    case Category_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case Category_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
};   

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case Category_UPDATE_REQUEST:
      return { loading: true };
    case Category_DELETE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case Category_DELETE_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
};   