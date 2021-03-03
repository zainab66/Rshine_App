import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { postcodeValidator } from 'postcode-validator';
import { generatePublicUrl } from '../urlConfig';
import FooterShippingScreen from './FooterShippingScreen'
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../rshineLogo.png'


export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [country, setCountry] = useState(shippingAddress.country);
  const [province, setProvince] = useState(shippingAddress.province);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [Apartment, setApartment] = useState(shippingAddress.apartment);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   saveShippingAddress({
    //     fullName,
    //     address,
    //     Apartment,
    //     city,
    //     postalCode,
    //     country,
    //     province
    //   })

    // );
    country && postcodeValidator(postalCode, country) && (
      props.history.push('/placeorder'))
  };
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  return (
    <div class="shippingDetails">
      <>
        <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" variant="light" >
          <Container >
            <Navbar.Brand href="/"><img
              src={Logo}
              width="170"
              height="70"
              className="d-inline-block align-top imgStyle"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
          </Container>
        </Navbar>
        <div class="container wow fadeIn">
          <div className="container checkout"><CheckoutSteps step1  ></CheckoutSteps></div>
          <h2 class="shippingTittle">Select a shipping address</h2>
          <div class="row">
            <div class="col-lg-6">
              <div class="card">
                <form class="card-body" onSubmit={submitHandler}>
                  <div class="md-form mb-3">
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
                  <button class="btnForAll  btn-block waves-effect waves-light" type="submit">Continue</button>
                </form>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card mb-4">
                <div class="card-body">
                  <h2 class="orderItemDetails mb-4">
                    Order Items</h2>
                  {cart.cartItems.map((item) => (
                    <>
                      <div class="row mb-4">
                        <div class="col-md-7 col-lg-12">
                          <div class="d-flex justify-content-between">
                            {item.qty && (
                              <span style={{
                                position: "absolute",
                                background: "#00bbcc",
                                color: "black",
                                width: "18px",
                                height: "20px",
                                borderRadius: "50px",
                                fontSize: "12px",
                                border: "2px solid #ffd480",
                                textAlign: "center",
                                alignSelf: "center",
                                marginLeft: 50,
                                marginTop: -50
                              }}>{item.qty}</span>)}
                            <img class="small"
                              src={item.image} alt={item.name} />
                            <div className="orderItemName">
                              {item.name}
                            </div>
                            <div class="orderItem ">
                              CA${item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>))}
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <div class="card mb-4">
                      <div class="card-body">
                        <a class="discountCode d-flex justify-content-between" data-toggle="collapse" href="#collapseExample"
                          aria-expanded="false" aria-controls="collapseExample">
                          Add a discount code (optional)
                    <span><i class="fas fa-chevron-down pt-1"></i></span>
                        </a>
                        <div class="collapse" id="collapseExample">
                          <div class="mt-3">
                            <div class="md-form md-outline mb-0">
                              <input type="text" id="discount-code" class="form-control font-weight-light"
                                placeholder="Enter discount code" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-7 col-lg-12">
                        <div class="d-flex justify-content-between">
                          Subtotal
                          <div class="orderItem ">
                            CA${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-7 col-lg-12">
                        <div class="d-flex justify-content-between">
                          Shipping <span style={{
                            position: "absolute",
                            background: "#00bbcc",
                            color: "black",
                            width: "18px",
                            height: "20px",
                            borderRadius: "50px",
                            fontSize: "12px",
                            border: "2px solid #ffd480",
                            textAlign: "center",
                            alignSelf: "center",
                            marginLeft: 60,

                          }}>?</span>
                          <div class=" ">
                            Next Step
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-7 col-lg-12">
                        <div class="d-flex justify-content-between">
                          Taxes
                          <div class="orderItem ">
                            CA${cart.taxPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class="shipping-hr mb-4 mt-0 d-inline-block mx-auto w-100" />
                    <div class="row mb-4">
                      <div class="col-md-7 col-lg-12">
                        <div class="d-flex justify-content-between">
                          Total
                          <div class="orderItem ">
                            CA${cart.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterShippingScreen />
      </>
    </div>

  );
}