import Axios from 'axios';
import { Category_LIST_REQUEST,Category_LIST_SUCCESS,
    Category_LIST_FAIL,
    Category_CREATE_REQUEST,
    Category_CREATE_SUCCESS,
    Category_CREATE_FAIL} from '../constants/categoryConstants';



export const getAllCategory = () => async (dispatch) =>{
    dispatch({
        type: Category_LIST_REQUEST,
 
    });
    try {
        const  { data }  = await Axios.get('/api/category');
        //const { data } = res.data;

        dispatch({ type: Category_LIST_SUCCESS, payload: data});
        //console.log({data});
    } catch(error){
        dispatch({ type: Category_LIST_FAIL, payload: error.message });
    }
};



// const getAllCategory = () => {
//     return async dispatch => {

//         dispatch({ type: Category_LIST_REQUEST });
//         const res =await Axios.get('/api/category');
//         //console.log(res);
//         if (res.status === 200) {

//             const { categoryList } = res.data;
//            // console.log(res);

//             dispatch({
//                 type: Category_LIST_SUCCESS,
//                 payload: { categories: categoryList }
//             });
//         } else {
//             dispatch({
//                 type: Category_LIST_FAIL,
//                 payload: { error: res.data.error }
//             });
//         }


//     }
// }
// export {
//     getAllCategory
// }







export const addCategory = (form) => async (dispatch, getState) => {
    dispatch({ type: Category_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/category/create',
        form,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: Category_CREATE_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: Category_CREATE_FAIL, payload: message });
    }
  };  