const { Category_LIST_REQUEST,
  Category_LIST_SUCCESS,
  Category_LIST_FAIL,
  Category_CREATE_REQUEST,
  Category_CREATE_SUCCESS,
  Category_CREATE_FAIL
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



export const productCreateReducer = (state = {}, action) => {
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