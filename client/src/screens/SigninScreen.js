import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MenueHeader from './MenueHeader'
import FootrScreen from './FootrScreen'

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history,redirect, userInfo]);
  // if (userInfo) {
  //   return <Redirect to={'/'} />
  // }
  return (
    <>
      <MenueHeader />
      <div className="zz">
        <form class="form-signin" onSubmit={submitHandler}>
          <h1 class="h4 mb-3 font-weight-normal text-center">Login</h1>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <label for="inputEmail" class="formLabel">Email address</label>
          <input type="email" id="inputEmail" class="form-control" onChange={(e) => setEmail(e.target.value)} required autofocus />

          <label for="inputPassword" class="formLabel">Password</label>
          <input type="password" id="inputPassword" class="form-control" onChange={(e) => setPassword(e.target.value)} required />

          <div class="mt-4 mb-4">
            <label className="newCustmer">
              New customer?{' '}
              <Link className="linkCreateAccount" to={`/register?redirect=${redirect}`}>
                Create account
              </Link>
            </label>
          </div>
          <button class="btnForAll  btn-block waves-effect waves-light" type="submit">Sign in</button>
        </form>
      </div>
      <FootrScreen />
    </>
  )
}
