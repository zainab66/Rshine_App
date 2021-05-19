import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MenueHeader from './MenueHeader'
import FootrScreen from './FootrScreen'
import ForgetPasswordScreen from './ForgetPasswordScreen';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import {USER_SIGNIN_SUCCESS} from '../constants/userConstants';
import FacebookLogin from 'react-facebook-login';


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


  const responseFacebook = (response) => {
    console.log('responseFacebook',response);
    Axios({method:"POST",
    url:'http://localhost:3001/api/users/facebooklogin',
    data:{accessToken:response.accessToken,userID:response.userID}
  
  
    }).then(response =>{
      console.log('hhh',response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
  
    })
    }
   
  //   const responseFacebook = async (response) => {
  //     try {
  //         const {accessToken, userID} = response
  //         console.log('accessToken, userID',accessToken, userID);

  //         const res = await Axios.post('http://localhost:3001/api/users/facebooklogin', {accessToken, userID})
  //         console.log('hhh',res.data);
  //     localStorage.setItem('userInfo', JSON.stringify(res.data));
  //     dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
  //         // setUser({...user, error:'', success: res.data.msg})
  //         // localStorage.setItem('firstLogin', true)

  //         // dispatch(dispatchLogin())
  //         // history.push('/')
  //     } catch (err) {
  //       console.log('hhh',err);

  //     }
  // }


const responseSuccessGoogle = (response) => {
  console.log('responseSuccessGoogle',response);
  Axios({method:"POST",
  url:'http://localhost:3001/api/users/googlelogin',
  data:{tokenId:response.tokenId}


  }).then(response =>{
    console.log('hhh',response.data);
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });

  })


}



const responseErrorGoogle = (response) => {
  console.log('responseErrorGoogle',response);
}
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
            <a href="/ForgetPasswordScreen">Forgot your password?</a>
          </div>
          <button class="btnForAll  btn-block waves-effect waves-light" type="submit">Sign in</button>
        </form>
        

      </div>
      <div className="hr">Or Login With</div>
        <div className="social">
        <GoogleLogin
    clientId=""
    buttonText="Login With Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
    <div className="hr">Or Login With</div>
        <div className="social">
        <FacebookLogin
                appId=""
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
  </div>

              </div>
      <FootrScreen />
    </>
  )
}
