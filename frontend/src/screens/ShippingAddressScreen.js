import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country
        })
      );
      props.history.push('/payment');

  };

  return (

  //   <main >

 
  //     <section class="mt-5 mb-4">

      

        
  //         <div class="col-lg-8 mb-4">

        
  //           <div class="card wish-list pb-1">
  //             <div class="card-body">

  //               <h5 class="mb-2">Choose a delivery address</h5>

           
              
  //               <div class="md-form md-outline mt-0">
  //               <label for="form14">Country </label>
  //                 <input type="text" id="form14"  class="form-control"/>
  //               </div>

              
  //               <div class="md-form md-outline mt-0">
  //               <label for="form14">Full name </label>
  //                 <input type="text" id="form14"  class="form-control"/>
  //               </div>

              
       
           
  //               <div class="md-form md-outline mt-0">
  //               <label for="form14">Street address </label>
  //                 <input type="text" id="form14"  class="form-control"/>
  //               </div>

              
  //               <div class="md-form md-outline">
  //               <label for="form15">Apt / Suite / Unit (optional)</label>
  //                 <input type="text" id="form15" class="form-control"/>
  //               </div>

             
  //               <div class="md-form md-outline">
  //               <label for="form16">City </label>
  //                 <input type="text" id="form16" class="form-control"/>
  //               </div>

              
  //               <div class="md-form md-outline">
  //               <label for="form17">Province</label>
  //                 <input type="text" id="form17" class="form-control"/>
  //               </div>

  //               <div class="md-form md-outline">
  //               <label for="form17">Postal code</label>
  //                 <input type="text" id="form17" class="form-control"/>
  //               </div>

              
          

  //             </div>
  //           </div>
        

  //         </div>
        
        


  //     </section>


  // </main>
    <div>
      <div className="contain">
      <CheckoutSteps step1 step2></CheckoutSteps></div>
      <form className="formShipping" onSubmit={submitHandler}>
        <div>
          <h3>Choose a delivery address</h3>
        </div>
        
          <div class="md-form md-outline mt-0">
          <label htmlFor="fullName">Full Name</label>
          <input class="form-control"
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div class="md-form md-outline mt-0">
          <label htmlFor="address">Address</label>
          <input class="form-control"
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div class="md-form md-outline mt-0">
          <label htmlFor="city">City</label>
          <input class="form-control"
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div class="md-form md-outline mt-0">
          <label htmlFor="postalCode">Postal Code</label>
          <input class="form-control"
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div class="md-form md-outline mt-0">
          <label htmlFor="country">Country</label>
          <input class="form-control"
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
       
        <div>
          <label />
          <button  class="btn btn-primary btn-block waves-effect waves-light" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}