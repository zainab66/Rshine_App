import React, { useEffect, useState } from 'react';
import { addToCart, getCartItems ,removeCartItem,removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import FootrScreen from './FootrScreen'
import MenueHeader from './MenueHeader'
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import CartItem from "./CartItem";


export default function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  // cart.itemsPrice = toPrice(
  //   cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  // );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  //cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.cartItems) {
      setCartItems(cart.cartItems)

      // dispatch(addToCart2());
    }
  }, [dispatch, cart.cartItems]);

    //console.log(' cart.cartItems' , cart.cartItems);

    //console.log(' cart' , cart);

  //  console.log(' cartItems' , cartItems);



  useEffect(() => {
    if(userInfo){
        dispatch(getCartItems());
    }
}, [dispatch,userInfo]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price,  img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, qty));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price,  img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price,  img }, qty));
  };

  const removeFromCartHandler = (_id) => {
    // delete action

    console.log('wwqqqq',_id)
    
    dispatch(removeFromCart({ productId: _id }));
  };
  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=CheckoutPage');
  };

//   return (
//     <>
//       <MenueHeader />
      
    
//         {Object.keys(cartItems).map((key, index) => (
//           <CartItem
//             key={index}
//             cartItem={cartItems[key]}
//             onQuantityInc={onQuantityIncrement}
//             onQuantityDec={onQuantityDecrement}
//           />
//         ))}
      
//         <FootrScreen />
    
//     </>

//   );
// }

  return (
    <>
      <MenueHeader />
      <div className="cartDetails">
      {!cartItems  ? (<>
          <main role="main" class="container">
            <div class="starter-template">
              Your cart is empty<a href="/" class="btnForAll ml-1" ><IoMdCart size={25} style={{ paddingBottom: 4, paddingLeft: 4 }} /><span className="continueShopping ">Continue shopping</span></a>
            </div>
          </main></>
        ) : (
            <div class="container">
              <section class="mt-5 mb-4">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="card wish-list mb-4">
                      <div class="card-body">
                     
                        <h2 class="numItemTittle mb-4">
                          <span> {Object.keys(cartItems).reduce((a, c) => a + cartItems[c].qty, 0)}</span> items in your basket</h2> 
                        {Object.keys(cartItems).map((key, index) => (
                          <>
                            <div class="row mb-4">
                              <div class="col-md-5 col-lg-3 col-xl-3">
                                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                  <Link id="productLink" to={`/${cartItems[key].name}/${cartItems[key]._id}/p`}>
                                    <img class="img-fluid w-100"
                                      src={cartItems[key].img} alt={cartItems[key].name} />
                                  </Link>
                                </div>
                              </div>
                              <div class="col-md-7 col-lg-9 col-xl-9">
                                <div>
                                  <div class="d-flex justify-content-between">
                                    <div>
                                      <h5 class="itemTittle">{cartItems[key].name}</h5>
                                      {cartItems[key].option && (
                                        <p class="mb-3 text-muted text-uppercase small">Options :{cartItems[key].option}</p>)}

                                      {cartItems[key].sizeFirstOption && (
                                        <p class="mb-3 text-muted text-uppercase small">Options :{cartItems[key].sizeFirstOption}</p>)}

                                      {cartItems[key].colorOption && (
                                        <p class="mb-2 text-muted text-uppercase small">Color: {cartItems[key].colorOption}</p>)}
                                      {cartItems[key].sizeOption && (
                                        <p class="mb-3 text-muted text-uppercase small">Size: {cartItems[key].sizeOption}</p>)}
                                      <p class="mb-3 text-muted text-uppercase small">Personalisation: {cartItems[key].message}</p>
                                    </div>
                                    <div>
                                      <div class="selectedQty ">

                                        
                                          <CartItem
                                            key={index}
                                            cartItem={cartItems[key]}
                                            onQuantityInc={onQuantityIncrement}
                                            onQuantityDec={onQuantityDecrement}

                                          />
                                       


                                        {/* <select className="browser-default custom-select"
                                          value={cartItems[key].qty}
                                          //onChange={(e) => setQty(e.target.value)} 
                                          onChange={(e) => 

                                             dispatch(
                                               addToCart({_id, name, price,countInStock,img,colorOption,sizeOption,sizeFirstOption,option,message}, Number(e.target.value)))
                                             
                                          }
                                        >
                                          {[...Array(cartItems[key].countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}    </option>
                                          ))}
                                        </select> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="d-flex justify-content-between align-items-center">
                                    <div>

                                    {/* onClick={() => removeFromCartHandler(cartItems[key]._id)} */}
                                       <button class="removeBtn small text-uppercase mr-3" onClick={() => onRemoveCartItem(cartItems[key]._id)} ><i
                                        class="fas fa-trash-alt mr-1"></i> Remove item </button>
                                       <a href="#!" type="button" class="card-link small text-uppercase"><i
                                      class="fas fa-heart mr-1"></i> Move to wish list </a> 
                                    </div>
                                    <p class="mb-0"><span className="itemPriceCart">CA${cartItems[key].price}</span></p>

                                    {/* <p class="mb-0"><span className="itemPriceCart">CA${cartItems[key].price.toFixed(2)}</span></p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr class="mb-4" />
                          </>))}
                      </div>
                    </div>
                    <div class="card mb-4">
                      <div class="card-body">
                        <h2 class="weAccept mb-4">We accept</h2>
                        <img class="mr-2" width="80px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                          alt="Visa" />
                        <img class="mr-2" width="80px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                          alt="American Express" />
                        <img class="mr-2" width="80px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                          alt="Mastercard" />
                        <img class="mr-2" width="80px"
                          src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
                          alt="PayPal acceptance mark" />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card mb-4">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                             <div className="Subtotal">
                              Subtotal ({Object.keys(cartItems).reduce((a, c) => a + cartItems[c].qty, 0)} items)
                            </div> 
                             <span className="Subtotal">CA$
                        {Object.keys(cartItems).reduce((a, c) => a + cartItems[c].price * cartItems[c].qty, 0).toFixed(2)}</span> 
                          </li>
                        </ul>
                        <button type="button" class="btnForAll  btn-block waves-effect waves-light" onClick={checkoutHandler}
                          disabled={cartItems.length === 0} >Checkout
                    </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
           )} 
        <FootrScreen />
      </div>
    </>

  );
}



// import React, { useEffect,useState } from 'react';
// import { addToCart, removeFromCart } from '../actions/cartActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { generatePublicUrl } from '../urlConfig';
// import FootrScreen from './FootrScreen'
// import { useLocation } from 'react-router-dom';
// import MenueHeader from './MenueHeader'
// import { IoMdCart } from "react-icons/io";
// import { Link } from 'react-router-dom';


// export default function CartScreen(props) {
//   const productId = props.match.params.id;
//   const qty = props.location.search
//     ? Number(props.location.search.split('=')[1])
//     : 1;

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
//   cart.itemsPrice = toPrice(
//     cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
//   );
//   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
//   cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (productId) {
//   //     dispatch(addToCart(productId, qty ));
//   //   }
//   // }, [dispatch, productId, qty]);


//   const removeFromCartHandler = (id) => {
//     // delete action
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     props.history.push('/signin?redirect=shipping');
//   };
//   return (
//     <>
//       <MenueHeader />
//       <div className="cartDetails">
//         {cartItems.length === 0 ? (<>
//           <main role="main" class="container">
//             <div class="starter-template">
//               Your cart is empty<a href="/" class="btnForAll" ><IoMdCart size={25} style={{ paddingBottom: 4, paddingLeft: 4 }} /><span className="continueShopping ">Continue shopping</span></a>
//             </div>
//           </main></>
//         ) : (
//             <div class="container">
//               <section class="mt-5 mb-4">
//                 <div class="row">
//                   <div class="col-lg-8">
//                     <div class="card wish-list mb-4">
//                       <div class="card-body">
//                         <h2 class="numItemTittle mb-4">
//                           <span>{cartItems.reduce((a, c) => a + c.qty, 0)}</span> items in your basket</h2>
//                         {cartItems.map((item) => (
//                           <>
//                             <div class="row mb-4">
//                               <div class="col-md-5 col-lg-3 col-xl-3">
//                                 <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
//                                   <Link id="productLink" to={`/${item.name}/${item.product}/p`}>
//                                     <img class="img-fluid w-100"
//                                       src={item.image} alt={item.name} />
//                                   </Link>
//                                 </div>
//                               </div>
//                               <div class="col-md-7 col-lg-9 col-xl-9">
//                                 <div>
//                                   <div class="d-flex justify-content-between">
//                                     <div>
//                                       <h5 class="itemTittle">{item.name}</h5>
//                                       {item.option && (
//                                         <p class="mb-3 text-muted text-uppercase small">Options :{item.option}</p>)}
//                                       {item.colorOption && (
//                                         <p class="mb-2 text-muted text-uppercase small">Color: {item.colorOption}</p>)}
//                                       {item.sizeOption && (
//                                         <p class="mb-3 text-muted text-uppercase small">Size: {item.sizeOption}</p>)}
//                                       <p class="mb-3 text-muted text-uppercase small">Personalisation: {item.message}</p>

//                                     </div>
//                                     <div>

//                                      <div class="selectedQty ">

//                                         <select className="browser-default custom-select"
//                                           value={item.qty}
//                                           onChange={(e) =>
//                                             dispatch(
//                                               addToCart(item.product, Number(e.target.value),item.colorOption,item.sizeOption,item.sizeFirstOption,item.option,item.message )
//                                             )
//                                           }
//                                         >
//                                           {[...Array(item.countInStock).keys()].map((x) => (
//                                             <option key={x + 1} value={x + 1}>
//                                               {x + 1}
//                                             </option>
//                                           ))}
//                                         </select>
//                                       </div> 
//                                     </div>
//                                   </div>
//                                   <div class="d-flex justify-content-between align-items-center">
//                                     <div>
//                                       <button class="removeBtn small text-uppercase mr-3" onClick={() => removeFromCartHandler(item.product)} ><i
//                                         class="fas fa-trash-alt mr-1"></i> Remove item </button>
//                                       {/* <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
//                                       class="fas fa-heart mr-1"></i> Move to wish list </a> */}
//                                     </div>
//                                     <p class="mb-0"><span className="itemPriceCart">CA${item.price.toFixed(2)}</span></p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <hr class="mb-4" />
//                           </>))}
//                       </div>
//                     </div>
//                     <div class="card mb-4">
//                       <div class="card-body">
//                         <h2 class="weAccept mb-4">We accept</h2>
//                         <img class="mr-2" width="80px"
//                           src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
//                           alt="Visa" />
//                         <img class="mr-2" width="80px"
//                           src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
//                           alt="American Express" />
//                         <img class="mr-2" width="80px"
//                           src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
//                           alt="Mastercard" />
//                         <img class="mr-2" width="80px"
//                           src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
//                           alt="PayPal acceptance mark" />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-lg-4">
//                     <div class="card mb-4">
//                       <div class="card-body">
//                         <ul class="list-group list-group-flush">
//                           <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                             <div className="Subtotal">
//                               Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
//                             </div>
//                             <span className="Subtotal">CA$
//                         {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</span>
//                           </li>
//                         </ul>
//                         <button type="button" class="btnForAll  btn-block waves-effect waves-light" onClick={checkoutHandler}
//                           disabled={cartItems.length === 0} >Checkout
//                     </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//             </div>
//           )}
//         <FootrScreen />
//       </div>
//     </>

//   );
// }