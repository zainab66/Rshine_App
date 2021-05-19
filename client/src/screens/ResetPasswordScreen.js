import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../actions/userActions';
export default function ResetPasswordScreen(props) {
    const resetLink = props.match.params.token;
        console.log(resetLink)

    const [newPass, setPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //console.log(email)
     dispatch(resetPassword(resetLink,newPass));
      };


    return (
        <div className="ForgetPasswordScreen">
        <form class="form-signin" onSubmit={submitHandler}>
          <h1 class="h4 mb-3 font-weight-normal text-center">please enter your new password</h1>
         
         

          <label for="inputPassword" class="formLabel">Password</label>
          <input type="password" id="inputPassword" class="form-control" onChange={(e) => setPassword(e.target.value)} required />

         
          <button class="btnForAll  btn-block waves-effect waves-light" type="submit">Sign in</button>
        </form>
      </div>
    )
}
