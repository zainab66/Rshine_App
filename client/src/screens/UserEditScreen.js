import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <div className="formProfileUser">
      <form className="form-signin" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>



<div class="form-label-group">
      <label for="inputName"  class="formLabel mt-2">Name</label>
        <input  id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)} class="form-control"  required/>
      </div>


<div class="form-label-group">
<label for="inputEmail"  class="formLabel mt-2">Email address</label>
        <input id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} class="form-control"  required autofocus/>
      </div>

      

      <div class="mb-3 mt-2">
        <label>
          <input  id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)} /> Is Admin
        </label>
      </div>
            {/* <div>
              <label htmlFor="name" class="formLabel">Name</label>
              <input
                class="form-control"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email" class="formLabel">Email</label>
              <input
                class="form-control"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
           
            <div>
              <label htmlFor="isAdmin" class="formLabel">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div> */}
            <div>
              <button type="submit" className="btnForAll  btn-block waves-effect waves-light">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}