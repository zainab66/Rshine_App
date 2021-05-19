import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../actions/userActions';

export default function ForgetPasswordScreen() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //console.log(email)
        dispatch(forgotPassword(email));
      };




    return (
        <div className="ForgetPasswordScreen">
        <form class="form-signin" onSubmit={submitHandler}>
          <h1 class="h4 mb-3 font-weight-normal text-center">enter your email to reset password</h1>
          
          <label for="inputEmail" class="formLabel">Email address</label>
          <input type="email" id="inputEmail" class="form-control" onChange={(e) => setEmail(e.target.value)} required autofocus />

          
          <button class="btnForAll  btn-block waves-effect waves-light" type="submit">reset password</button>

         
        </form>
      </div>
    )
}
