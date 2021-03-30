import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress  } from '../actions/addressActions';
import FooterShippingScreen from './FooterShippingScreen'
import { Navbar, Container } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { postcodeValidator } from 'postcode-validator';
import CheckoutSteps from '../components/CheckoutSteps';
import Logo from '../rshineLogo.png'

 export default function AddressFormScreen(props) {
  const addressw = useSelector(state => state.addressw);
  //const {loading, error,address} =addressw;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { initialData } = props;
    const [country, setCountry] = useState(initialData ? initialData.country : "");
    const [province, setProvince] = useState(
      initialData ? initialData.province : ""
    );
    const [fullName, setFullName] = useState(
      initialData ? initialData.fullName : ""
    );
    const [address, setAddress] = useState(
      initialData ? initialData.address : ""
    );
 
    const [Apartment, setApartment] = useState(
      initialData ? initialData.Apartment : ""
    );
    const [city, setCity] = useState(initialData ? initialData.city : "");
    const [postalCode, setPostalCode] = useState(
      initialData ? initialData.postalCode : "");

    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "");

    // const [country, setCountry] = useState('');
    // const [province, setProvince] = useState('');
    // const [fullName, setFullName] = useState('');
    // const [address1, setAddress] = useState('');
    // const [Apartment, setApartment] = useState('');
    // const [city, setCity] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    
    const inputContainer = {
        width: '100%',
        marginRight: 10
    };

    const onAddressSubmit = () => {
      const payload = {
        address: {
          country,
          province,
          fullName,
          address,
          Apartment,
          city,
          postalCode
        }
    }
    console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);

    }
  
    useEffect(() => {
      console.log("addressCount", addressw.address);
      if (submitFlag) {
        console.log("where are we", addressw);
        let _address = {};
        if (id) {
          _address = {
            _id: id,
            country,
            province,
            fullName,
            address,
            Apartment,
            city,
            postalCode
          };
        }
        // } else {
        //   _address = addressw.address.slice(addressw.address.length - 1)[0];
        // }
  
        props.onSubmitForm(_address)
      }
    }, [ addressw.address]);
  




    const renderAddressForm = () => {
      return (
        <>
        <div class="">
                {/* <form class="" onSubmit={onAddressSubmit}>  */}
                
                 <h2 class="shippingMethod"> 
               </h2>
                  <div class="md-form mb-3 mt-4">
                    <label for="country" class="">Country</label>
                    <CountryDropdown class="form-control"
                      value={country}
                      valueType="short"
                      onChange={setCountry}
                      priorityOptions={["CA", "US", "GB"]}
                      required />
                  </div>
                  <div class="md-form mb-3">
                    <label for="fullName" class="">Full Name</label>
                    <input type="text" id="fullName" class="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                  <div class="md-form mb-3">
                    <label for="address" class="">Street address </label>
                    <input type="text" id="address" class="form-control" placeholder="" value={address}
                      onChange={(e) => setAddress(e.target.value)} required />
                  </div>

                  <div class="md-form mb-3">
                    <label for="apartment" class="">Apt / Suite / Unit (optional)</label>
                    <input type="text" id="apartment" class="form-control" placeholder="" value={Apartment} onChange={(e) => setApartment(e.target.value)} />
                  </div>

                  <div class="md-form mb-3">
                    <label for="city" class="">City</label>
                    <input type="text" id="city" class="form-control" placeholder="" value={city}
                      onChange={(e) => setCity(e.target.value)} required />
                  </div>
                  <div class="row">
                    <div class="col-lg-6 col-md-6 mb-4">
                      <label for="province">Province/State </label>
                      <RegionDropdown class="form-control"
                        country={country}
                        countryValueType="short"
                        value={province}
                        onChange={setProvince} required />
                    </div>
                    <div class="col-lg-6 col-md-6 mb-4">
                      <label for="zip">Postal code</label>
                      <input type="text" class="form-control" id="zip" placeholder="" value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)} required />
                      {country && postalCode && !postcodeValidator(postalCode, country) && (
                        <p className="validPostalCode">Please enter a valid postal code.</p>)}
                    </div>

                  </div>
                  {/* <hr class="mb-4" /> */}
                  <button class="btnForAll  btn-block waves-effect waves-light mb-4" type="button" onClick={onAddressSubmit}>Delivery Here</button>
                {/* </form> */}
              </div>
       

          
             
        
     
      </>
  
  
  );

}
if (props.withoutLayout) {
  return <div>{renderAddressForm()}</div>;
}
    return (
        
    
  <div class="card wish-list mb-4">
                  <div class="card-body">                 
                   {/* <form class="" onSubmit={onAddressSubmit}>  */}
                   
                    <h2 class="shippingMethod"> 
                  <span className="stepNumber">+</span>
                    <span className="stepTitle">{'Add New Address'}</span></h2>
                    <div class="md-form mb-3 mt-4">
                      <label for="country" class="">Country</label>
                      <CountryDropdown class="form-control"
                        value={country}
                        valueType="short"
                        onChange={setCountry}
                        priorityOptions={["CA", "US", "GB"]}
                        required />
                    </div>
                    <div class="md-form mb-3">
                      <label for="fullName" class="">Full Name</label>
                      <input type="text" id="fullName" class="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div class="md-form mb-3">
                      <label for="address" class="">Street address </label>
                      <input type="text" id="address" class="form-control" placeholder="" value={address}
                        onChange={(e) => setAddress(e.target.value)} required />
                    </div>
  
                    <div class="md-form mb-3">
                      <label for="apartment" class="">Apt / Suite / Unit (optional)</label>
                      <input type="text" id="apartment" class="form-control" placeholder="" value={Apartment} onChange={(e) => setApartment(e.target.value)} />
                    </div>
  
                    <div class="md-form mb-3">
                      <label for="city" class="">City</label>
                      <input type="text" id="city" class="form-control" placeholder="" value={city}
                        onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div class="row">
                      <div class="col-lg-6 col-md-6 mb-4">
                        <label for="province">Province/State </label>
                        <RegionDropdown class="form-control"
                          country={country}
                          countryValueType="short"
                          value={province}
                          onChange={setProvince} required />
                      </div>
                      <div class="col-lg-6 col-md-6 mb-4">
                        <label for="zip">Postal code</label>
                        <input type="text" class="form-control" id="zip" placeholder="" value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)} required />
                        {country && postalCode && !postcodeValidator(postalCode, country) && (
                          <p className="validPostalCode">Please enter a valid postal code.</p>)}
                      </div>
  
                    </div>
                    <hr class="mb-4" />
                    <button class="btnForAll  btn-block waves-effect waves-light" type="button" onClick={onAddressSubmit}>Save</button>
                  {/* </form> */}
                </div>
         

            
               
          
       
</div>
    
    
    );

}
