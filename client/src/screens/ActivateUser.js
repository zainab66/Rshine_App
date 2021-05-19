import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateUser } from '../actions/userActions';

export default function ActivateUser(props) {
    const dispatch = useDispatch();

    const token = props.match.params;
    console.log(token)
    const submitHandler = () => {

    dispatch(activateUser(token));
        props.history.push('/signin');
      };

      
    return (
        <div className="activateUser">
            <h4 class="mt-5">You have been successfully activated.You can login now!</h4>  <button
                      type="button"
                      onClick={submitHandler}
                    >
                      Login
                    </button>
        </div>
    )
}
