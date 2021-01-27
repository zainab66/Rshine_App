import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import FootrScreen from './FootrScreen'

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <>
    <div className="contain">
      <form className="formSingup" onSubmit={submitHandler}>
        <div>
          <h1 class="text-center">Create account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name"></label>
          <input  class="form-control"
            type="text"
            id="name"
            placeholder=" Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email"></label>
          <input  class="form-control"
            type="email"
            id="email"
            placeholder=" Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password"></label>
          <input  class="form-control"
            type="password"
            id="password"
            placeholder=" Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword"></label>
          <input  class="form-control"
            type="password"
            id="confirmPassword"
            placeholder=" Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="btnCart" type="submit">
            Create
          </button>
        </div>
        <div>
          <label />
          <div>
          Returning customer?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
          </div>
          <label/>
        </div>
      </form>
      
    </div>
         <FootrScreen/>
</>
  );
}