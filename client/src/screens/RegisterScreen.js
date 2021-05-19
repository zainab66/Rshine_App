import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import FootrScreen from './FootrScreen'
import MenueHeader from './MenueHeader'

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fileName, setFileName] = useState('');

  // const redirect = props.location.search
  //   ? props.location.search.split('=')[1]
  //   : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } 
    // else {
    //   dispatch(register(name, email, password));
    // }

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    form.append("profilePicture", fileName);

    dispatch(register(
      form
    ));
    if (form) {
      alert('Please visit your email address and activate your account');
    } 
  };
  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push(redirect);
  //   }
  // }, [props.history, redirect, userInfo]);
  return (

    <>
      <MenueHeader />
      <div className="zz">
        <form class="form-signin" onSubmit={submitHandler}>
          <h1 class="h4 mb-3 font-weight-normal text-center">Create account</h1>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          <label for="inputName" class="formLabel">Your name</label>
          <input type="text" id="name" class="form-control" onChange={(e) => setName(e.target.value)} required />

          <label for="inputEmail" class="formLabel">Email address</label>
          <input type="email" id="inputEmail" class="form-control" onChange={(e) => setEmail(e.target.value)} required autofocus />

          <label for="inputPassword" class="formLabel">Password</label>
          <input type="password" id="inputPassword" class="form-control" onChange={(e) => setPassword(e.target.value)} required />

          <label for="confirmPassword" class="formLabel">Password again</label>
          <input type="password" id="confirmPassword" class="form-control" onChange={(e) => setConfirmPassword(e.target.value)} required />

          <label for="profilePicture" class="formLabel">Add / Change Image:</label>
        <input class="form-control" filename="profilePicture" type="file"
          onChange={(e) => setFileName(e.target.files[0])}></input>




          <div class="mt-4 mb-4">
            {/* <label className="newCustmer">
              Returning customer?{' '}
              <Link className="linkCreateAccount" to={`/signin?redirect=${redirect}`}>
                Sign in
            </Link>
            </label> */}
          </div>
          <button class="btnForAll  btn-block waves-effect waves-light" type="submit">Create your Rshine account</button>
        </form>
      </div>
      <FootrScreen />
    </>
  );
}