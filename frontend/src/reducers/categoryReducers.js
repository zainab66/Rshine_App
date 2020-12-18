const { Category_LIST_REQUEST,Category_LIST_SUCCESS,Category_LIST_FAIL
} = require('../constants/categoryConstants');


export const categoryListReducer = (  state = { loading: true, categories: [] },
    action) =>{
    switch (action.type) {
        case Category_LIST_REQUEST:
            return { loading: true };
          case Category_LIST_SUCCESS:
            return { loading: false, categories: action.payload.categoryList };
          case Category_LIST_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };

