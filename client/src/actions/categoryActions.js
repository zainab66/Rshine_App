import Axios from 'axios';
import { Category_LIST_REQUEST,Category_LIST_SUCCESS,
    Category_LIST_FAIL,
    Category_CREATE_REQUEST,
    Category_CREATE_SUCCESS,
    Category_CREATE_FAIL, Category_UPDATE_REQUEST,Category_UPDATE_SUCCESS,Category_UPDATE_FAIL,Category_DELETE_REQUEST,Category_DELETE_SUCCESS,Category_DELETE_FAIL} from '../constants/categoryConstants';



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

  export const updateCategories = (form) => async (dispatch, getState) => {
    dispatch({ type: Category_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/category/update',
        form,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: Category_UPDATE_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: Category_UPDATE_FAIL, payload: message });
    }
  };  
 


 

  export const deleteCategoriesAction = (ids) => async (dispatch, getState) => {
    dispatch({ type: Category_DELETE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const {data} = Axios.post(`/api/category/delete`, {payload:{ids}},{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: Category_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: Category_DELETE_FAIL, payload: message });
    }
  };