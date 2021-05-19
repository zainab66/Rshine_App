import React, { useEffect, useState } from 'react';
import { getAddress } from '../actions/addressActions';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from './AddressFormScreen';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../rshineLogo.png'
import CheckoutSteps from '../components/CheckoutSteps';
import FooterShippingScreen from './FooterShippingScreen'
import { addToCart, getCartItems } from '../actions/cartActions';

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div onClick={props.onClick}
        className={`checkoutHeader ${props.active && 'active'}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
}

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.fullName}</span>
                <span className="addressType">{adr.address}</span>
                <span className="addressMobileNumber">{adr.city}</span>
              </div>
              {adr.selected && (
                                              <button class="priceShipping text-info"   onClick={() => enableAddressEditForm(adr)}>Edit</button>
                                            )}
            </div>
            <div className="fullAddress">

            </div>
            {adr.selected && (
              <button
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default function CheckoutPage(props) {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const addressw = useSelector(state => state.addressw);
  const { loading, error, address } = addressw;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState(false);
  const [address11, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  console.log('address11',address11);
  console.log('confirmAddress',confirmAddress);
  console.log('selectedAddress',selectedAddress);



  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    //setOrderSummary(true);
  };


  useEffect(() => {
    dispatch(getAddress());
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (cart.cartItems) {
      setCartItems(cart.cartItems)

      // dispatch(addToCart2());
    }
  }, [dispatch, cart.cartItems]);


  useEffect(() => {
    if (confirmAddress) {
      props.history.push('/placeorder');
    }
  })


  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;

cart.address =selectedAddress;



  useEffect(() => {
    if (address) {
      const address1 = address.map((adr) => ({
        ...adr,
        selected: false,
        edit: false,
      }));
      setAddress(address1)
    };
    //user.address.length === 0 && setNewAddress(true);
  }, [dispatch, address]);


  const selectAddress = (addr) => {
    const updatedAddress = address11.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);

  };


  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
    // props.history.push('/payment');

  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address11.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };



  return (
    <div className="shippingDetails">
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
      <div class="container">
        <div className="container checkout"><CheckoutSteps step1 step2  ></CheckoutSteps></div>
        {/* <div>{JSON.stringify(address11)}</div> */}
        <section class="mt-5 mb-4">
          <div class="row">
            <div class="col-lg-6">
              {/* <div class="card wish-list mb-4">
                <div class="card-body">
               <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!userInfo}
                        body={
                            <div className="loggedInId">
                                <span style={{ fontWeight: 500 }}>{userInfo.name}</span>
                                <span style={{ margin: '0 5px' }}>{userInfo.email}</span>
                            </div>
                        }
                    />

</div>
</div> */}


                  <h2 class="shippingMethod">Delivery Address</h2>
                  <CheckoutStep
                    // stepNumber={"2"}
                    //title={"DELIVERY ADDRESS"}
                    active={!confirmAddress && userInfo}
                    body={
                      <>
                        {confirmAddress ? (
                          <div>{`${selectedAddress.address} - ${selectedAddress.city}`}</div>
                        ) : (
                          address11.map((adr) => (
                            <Address
                              selectAddress={selectAddress}
                              enableAddressEditForm={enableAddressEditForm}
                              confirmDeliveryAddress={confirmDeliveryAddress}
                              onAddressSubmit={onAddressSubmit}
                              adr={adr}
                            />
                          ))
                        )}
                      </>
                    }
                  />
               

                  <hr class="  mb-4 mt-4 d-inline-block mx-auto w-100" /> 

              {confirmAddress ? null
                : newAddress ? (
                  <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                ) : userInfo ? (
                 
                      <CheckoutStep
                        stepNumber={"+"}
                        title={"ADD NEW ADDRESS"}
                        active={false}
                        onClick={() => setNewAddress(true)}
                      />
                ) : null}

            </div>

            {/* <div class="card wish-list mb-4">
                <div class="card-body">
              <CheckoutStep
                stepNumber={"3"}
                title={"ORDER SUMMARY"}
                active={orderSummary}
              // body={orderSummary ? <CartPage onlyCartItems={true} /> : null}
              />
              </div>
              </div>

              <div class="card wish-list mb-4">
                <div class="card-body">
              <CheckoutStep stepNumber={"4"} title={"PAYMENT OPTIONS"} />
            </div>
            </div> */}



            <div class="col-lg-6">
              <div class="card mb-4">
                <div class="card-body">
                  <h2 class="orderItemDetails mb-4">
                    Order Items</h2>
                  {cartItems.map((key, index) => (
                    <>
                      <div class="row mb-4">
                        <div class="col-md-7 col-lg-12">
                          <div class="d-flex justify-content-between">
                            {key.qty && (
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
                              }}>{key.qty}</span>)}
                            <img class="small"
                              src={key.img} alt={key.name} />
                            <div className="orderItemName">
                              {key.name}
                            </div>
                            <div class="orderItem ">
                              CA${key.price.toFixed(2)}
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

                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterShippingScreen />
    </div>


  );

}














