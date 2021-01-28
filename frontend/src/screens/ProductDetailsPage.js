import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { generatePublicUrl } from '../urlConfig';
import MenueHeader from './MenueHeader';
import { AiFillThunderbolt } from "react-icons/ai";
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { Form } from 'react-bootstrap';
import ProductImage from './ProductImage';
import FootrScreen from './FootrScreen'


export default function ProductDetailsPage(props) {
  console.log('lll',props)
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [qty, setQty] = useState(1);
  const [sizeOption, setSizeOption] = useState("");
  const [colorOption, setColorOption] = useState("");
  const [option, setOption] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(null);

  const [comment, setComment] = useState('');
  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&sizeOption=${sizeOption}&colorOption=${colorOption}&option=${option}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  return (
    <div>
      <MenueHeader />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div className="details">
              <div class="container">
                <div className="breed">
                  <ul>
                    <li>
                      <a href="#"><Link to="/">Home</Link></a>
                      <IoIosArrowForward />
                    </li>
                    {/* <li>
                   <a href="#">Mobiles</a>
                   <IoIosArrowForward />
                 </li> */}
                    <li>
                      <a href="#">{product.category}</a>
                      <IoIosArrowForward />
                    </li>
                    <li>
                      <a href="#">{product.name}</a>
                    </li>
                  </ul>
                </div>
                <section class="mb-5">

                  <div class="row">
                    <div class="col-md-6 mb-4 mb-md-0">

                      <div id="mdb-lightbox-ui"></div>

                      <div class="mdb-lightbox">

                        <div class="row product-gallery mx-1">

                          <ProductImage detail={product} />

                          {/* 
                  <div class=" mb-0">
                    <figure class="img-hover-zoom view overlay rounded z-depth-1 main-img " style={{ marginBottom: 10 ,maxHeight:450}} >
                     
                        <img src={generatePublicUrl(product.productPictures[0].img)}
                          class="img-fluid z-depth-1" alt={`${product.productPictures[0].img}`} />
                      
                    </figure>

                  </div> */}
                          {/* <div class="">
                    <div class="row">
                    {product.productPictures.map((thumb, index) => (
                      <div class="">
                        <div class="imgContainer">
                       
                        <img src={generatePublicUrl(thumb.img)} alt={thumb.img}
                          class=" " />
                    
                          <div class="mask rgba-white-slight"></div>
                        </div>
                      </div>
))}
                    </div>
                  </div> */}
                        </div>

                      </div>
                    </div>
                    <div class="col-md-6">

                      <h5>{product.name}</h5>
                      <p class="mb-2 text-muted text-uppercase small">{product.category}</p>
                      <Rating
                        rating={product.rating}
                      ></Rating>
                      
                     {product.discountPrice ?(
                      <p><span class="mr-1"><strong> CA${product.discountPrice}</strong><strong  className="discount"> CA${product.price}</strong></span></p>
                    ):(<p><span class="mr-1"><strong> CA${product.price}</strong></span></p>)}
                      
                      <p className="instock">
                        
                      {product.countInStock > 0 ? (
                                <span className="success"><i class="fa fa-check" aria-hidden="true"></i>
                                In Stock</span>
                              ) : (
                                  <span className="danger">Unavailable</span>
                                )}
                        
                        </p>


                      <p class="pt-1"> {product.description}</p>
                      <div class="table-responsive">
                      { product.colorOption1  && (
                                    <Form>
                                      <Form.Group controlId="exampleForm.SelectCustom" value={colorOption}
                                    onChange={(e) => setColorOption(e.target.value)} >Color
                                        <Form.Control as="select" custom>
                                        <option>Select an option</option>
                                    <option>{product.colorOption1}</option>
                                    <option> {product.colorOption2}</option>
                                    <option> {product.colorOption3}</option>
                                    <option> {product.colorOption4}</option>
                                        </Form.Control>
                                      </Form.Group>
                                    </Form>)}
                                    {product.sizeOption1 && (
                                    <Form>
                                      <Form.Group controlId="exampleForm.SelectCustom"value={sizeOption}
                                    onChange={(e) => setSizeOption(e.target.value)} >Size
                                        <Form.Control as="select" custom>
                                        <option selected>Select an option</option>
                                    <option>{product.sizeOption1}</option>
                                    <option> {product.sizeOption2}</option>
                                        </Form.Control>
                                      </Form.Group>
                                    </Form>)}
                          {/* {product.sizeOption1 && (
                            <tr>
                              <th class="pl-0 w-25" scope="row"><strong>Size</strong></th>
                              <td>
                                <div class="form-group">
                                  <select class="form-control" id="exampleFormControlSelect1" value={sizeOption}
                                    onChange={(e) => setSizeOption(e.target.value)}>
                                    <option selected>Select an option</option>
                                    <option>{product.sizeOption1}</option>
                                    <option> {product.sizeOption2}</option>
                                  </select>
                                </div>
                              </td>
                            </tr>
                          )} */}

{/*                            
                            {product.colorOption1 &&(
                            <tr>
                              <th class="pl-0 w-25" scope="row"><strong>Color</strong></th>
                              
                              <td>
                                <div class="form-group">
                                  <select class="form-control" id="exampleFormControlSelect1" value={colorOption}
                                    onChange={(e) => setColorOption(e.target.value)}>
                                    <option>Select an option</option>
                                    <option>{product.colorOption1}</option>
                                    <option> {product.colorOption2}</option>
                                    <option> {product.colorOption3}</option>
                                    <option> {product.colorOption4}</option>

                                  </select>
                                </div>
                              </td>
                            </tr>
                               )} */}
                               {product.option1 &&(
                                    <Form>
                                      <Form.Group controlId="exampleForm.SelectCustom" value={option}
                                    onChange={(e) => setOption(e.target.value)}>Options
                                        <Form.Control as="select" custom>
                                        <option>Select an option</option>
                                    <option>{product.option1}</option>
                                    <option> {product.option2}</option>
                                        </Form.Control>
                                      </Form.Group>
                                    </Form>)}
                               {/* {product.option1 &&(
                            <tr>
                              <th class="pl-0 w-25" scope="row"><strong>Options</strong></th>
                              <td>
                                <div class="form-group">
                                  <select class="form-control" id="exampleFormControlSelect1" value={option}
                                    onChange={(e) => setOption(e.target.value)}>
                                    <option>Select an option</option>
                                    <option>{product.option1}</option>
                                    <option> {product.option2}</option>
                                  </select>
                                </div>
                              
                          )} */}
                          
                      </div>

                      <div>
                        <h6>Add your personalisation </h6>
                        <p> </p>
                       
                      </div>

                      <div class="form-group">
  <textarea class="form-control" rows="4" id="comment"></textarea>
</div>
 
                   
                      {/* {product.countInStock > 0 ? (
                                <span className="success">In Stock</span>
                              ) : (
                                  <span className="danger">Unavailable</span>
                                )}
                                */}
                      <div class="table-responsive mb-2">
                        <table class="table table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td class="pl-0 pb-0 w-25">Quantity</td>
                              
                            </tr>
                            <tr>
                              <td class="pl-0">
                                <div class="def-number-input number-input safari_only mb-0">

                                  {product.countInStock > 0 && (
                                    <Form>
                                      <Form.Group controlId="exampleForm.SelectCustom" value={qty}
                                        onChange={(e) => setQty(e.target.value)} >
                                        <Form.Control as="select" custom>
                                          {[...Array(product.countInStock).keys()].map(
                                            (x) => (
                                              <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                              </option>
                                            )
                                          )}
                                        </Form.Control>
                                      </Form.Group>
                                    </Form>)}
                                </div>
                              </td>

                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* <button type="button" class="btn btn-primary btn-md mr-1 mb-2">Go to Shopping</button> */}
                      <button type="button" class="btnCart  btn-block waves-effect waves-light " onClick={addToCartHandler}><IoMdCart size={25} /><span>ADD TO CART</span></button>
                   
                      <div  className="listTogle" id="accordion">
    <div class="card">
      <div class="card-header">
        <a class="card-link" data-toggle="collapse" href="#collapseOne">
       Highlights
       </a>
      </div>
      <div id="collapseOne" class="collapse show" data-parent="#accordion">
        <div class="card-body">
          {product.madeBy &&(
        <p><i class="fa fa-hand-stop-o" style={{font:36}}></i>{product.madeBy}</p>)}
        {product.material &&(
        <p><svg className="material" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.1 6c.7 1.7.9 3.6.4 5.6-.8 3.4-3.5 6.1-6.9 6.9-2 .5-3.9.2-5.6-.4v1.4L7.5 21h12l1.5-1.5v-12L19.5 6h-1.4z"></path><path d="M9.5 2C5.4 2 2 5.4 2 9.5S5.4 17 9.5 17 17 13.6 17 9.5 13.6 2 9.5 2zM7.8 15c-.6-.2-1.2-.5-1.7-.9l8-8c.4.5.7 1.1.9 1.7L7.8 15zm3.4-11c.6.2 1.2.5 1.7.9l-8 8c-.4-.5-.7-1.1-.9-1.7L11.2 4zM9 3.8L3.8 9C4 6.2 6.2 4 9 3.8zm1 11.4l5.2-5.2c-.2 2.8-2.4 5-5.2 5.2z"></path></svg>
        Material: {product.material}
        </p>)}
        </div>
       
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
          Description
       </a>
      </div>
      <div id="collapseTwo" class="collapse" data-parent="#accordion">
        <div class="card-body">
        
        This is an adorable Octonauts themed cake topper, perfect for your child's Octonauts themed birthday party!!!

The cake topper is around 5x7 inches (more or less depending on each character), and features your child's favorite character holding a seashell with a number for the age of your child.

You have to chose the character you want on the cake topper, and the color of the seashell as well.

My cake toppers are made to order, so if you want to modify anything just let me know!!

Check out my shop for the matching Happy Birthday Banner and other Octonauts Decoration or send me a message and I will help create a package just for you :)



***For SHIPPING inside of CANADA: tracking number is not provided with the regular shipping option. If you want to be able to track your package, please let me know and I will give you the difference in price. Please note that I am unable to know where your package is after I post it if it has no tracking number on it, hence I am not responsible for any delays or lost packages shipped with the regular shipping option via Canada Post.

**** If you order last minute for your party, please note that I might add a 'Rush Fees' surcharge to your order. You can ask me before you place your order if you need the Rush Fee or not. I try to accommodate most of my clients without the rush fees, but sometimes it is necessary when my schedule is full.

https://www.etsy.com/ca/listing/766343204/rush-fees?ref=shop_home_active_15&frs=1

****Also, if you do not have enough time for shipping (minimum of 4-7 business days depending on where you are located), please choose the Express Shipping option at checkout, or contact me to double check if you need express shipping or not.

***If you are located OUTSIDE of Canada and the US please contact me for exact shipping rates.


Disclaimer:
All copyrights and trademarks of the characters used belong to their respective owners and are not being sold. This item is not a licensed product and I don't claim ownership over characters used.
If you have any issue for copyrights matters, please contact me through my email, r.shinegraphics [!at] gmail.com, to discuss this matter. My intentions is not to infringe any copyrights, but it was impossible to get in contact with the right departement when I did my research on how to use some of the characters used in my shop!!!        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">
       Delivery and return policies
        </a>
      </div>
      <div id="collapseThree" class="collapse" data-parent="#accordion">
        <div class="card-body">
       {product.readyToDispatch &&(
            <p>Ready to dispatch in <h4>{product.readyToDispatch}business days</h4></p>)}
            {product.costToDeliver &&(
            <p className="costDeliver">Cost to deliver <h4>{product.costToDeliver}</h4></p>)}
            
            <p className="">Returns & exchanges <h4>Accepted</h4>Exceptions may apply</p>

        </div>
      </div>
    </div>
  </div>
                   
                   
                   
                   
                    </div>


                    
                  </div>

                </section>

                <div class="classic-tabs">

                  <ul class="nav tabs-primary nav-justified pb-4" id="advancedTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active show" id="description-tab" data-toggle="tab" href="#description" role="tab"
                        aria-controls="description" aria-selected="true">Description</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info"
                        aria-selected="false">Information</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews"
                        aria-selected="false">Reviews ({product.numReviews})</a>
                    </li>
                  </ul>
                  <div class="tab-content" id="advancedTabContent">
                    <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                      <h5>Product Description</h5>
                      <p class="small text-muted text-uppercase mb-2">{product.category}</p>
                      <Rating
                        rating={product.rating}
                      ></Rating>
                      <h6>CA${product.price}</h6>
                      <p class="pt-1">{product.description}</p>
                    </div>
                    <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                      <h5>Additional Information</h5>
                      <table class="table table-striped table-bordered mt-3">
                        <thead>
                          <tr>
                            <th scope="row" class="w-150 dark-grey-text h6">Made By</th>
                            <td><em>{product.madeBy}</em></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" class="w-150 dark-grey-text h6">Dimensions</th>
                            <td><em>50 × 60 cm</em></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                      {product.reviews.length === 0 && (
                        <MessageBox>There is no review</MessageBox>
                      )}

                      {product.reviews.map((review) => (<>
                        <h5><span>{product.numReviews}</span> review for <span>{product.name}</span></h5>

                        <div class="media mt-3 mb-4">
                          <img class="d-flex mr-3 z-depth-1" src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"
                            width="62" alt="" />
                          <div class="media-body">
                            <div class="d-flex justify-content-between">


                              <p class="mt-1 mb-2">

                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} ></Rating>

                                <span>{review.createdAt.substring(0, 10)}</span>
                              </p>


                            </div>
                            <p class="mb-0">{review.comment}</p>
                          </div>
                        </div>   </>))}
                      <hr />
                      {userInfo ? (<form className="form" onSubmit={submitHandler}>
                        <h5 class="mt-4">Add a review</h5>
                        <p>Your email address will not be published.</p>
                        <div class="my-3">
                          <div>
                            <label htmlFor="rating">Rating</label>
                            {[...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;
                              return (
                                <label>
                                  <input className="rattingInput" type="radio" name="rating" value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                  />

                                  <IoIosStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={25}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)} /></label>);
                            })}

                          </div>
                        </div>
                        <div>
                          <div class="md-form md-outline">
                            <textarea class="md-textarea form-control pr-6" rows="4" id="comment" value={comment}
                              onChange={(e) => setComment(e.target.value)}></textarea>
                            <label for="comment">Your review</label>
                          </div>
                          {/* <div class="md-form md-outline">
                  <input type="text" id="form75" class="form-control pr-6" />
                  <label for="form75">Name</label>
                </div>
                <div class="md-form md-outline">
                  <input type="email" id="form77" class="form-control pr-6" />
                  <label for="form77">Email</label>
                </div> */}
                          <div class="text-right pb-2">
                            <button type="submit" class="btn btn-primary">Add a review</button>
                            <div>
                              {loadingReviewCreate && <LoadingBox></LoadingBox>}
                              {errorReviewCreate && (
                                <MessageBox variant="danger">
                                  {errorReviewCreate}
                                </MessageBox>
                              )}
                            </div>
                          </div>
                        </div></form>
                      ) : (<MessageBox>
                        Please <Link to="/signin">Sign In</Link> to write a review
                      </MessageBox>)}
                    </div>

                  </div>

                </div>

                <hr />

                <section class="text-center">

                  <h4 class="text-center my-5"><strong>Related products</strong></h4>

                  <div class="row">

                    <div class="col-md-6 col-lg-3 mb-5">

                      <div class="">

                        <div class="img-hover-zoom">
                          <img class="img-fluid w-100"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" />
                          <a href="#!">

                          </a>
                        </div>

                        <div class="pt-4">

                          <h5>Blue denim shirt</h5>
                          <p><span><strong>$17.99</strong></span></p>

                        </div>

                      </div>

                    </div>



                  </div>

                </section>

              </div>
            </div>



          )}
      <FootrScreen />

    </div>

    //     <div className="productDescriptionContainer">
    //       <div className="flexRow">
    //         <div className="verticalImageStack">
    //           {product.productPictures.map((thumb, index) => (
    //             <div className="thumbnail">
    //               <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
    //             </div>
    //           ))}
    //         </div>
    //         <div className="productDescContainer">
    //           <div className="productDescImgContainer">
    //             <img
    //               src={generatePublicUrl(product.productPictures[0].img)}
    //               alt={`${product.productPictures[0].img}`}
    //             />
    //           </div>

    //           {/* action buttons */}
    //           <div className="flexRow">
    //             <button className="btnAddtoCart" onClick={addToCartHandler}
    //               style={{
    //                 marginRight: "5px"
    //               }}><IoMdCart /> <span>ADD TO CART</span></button>

    //             <button className="btnBuyNow"
    //               style={{ marginLeft: "5px" }}
    //             ><AiFillThunderbolt /><span>BUY NOW</span></button>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         {/* home > category > subCategory > productName */}
    //         <div className="breed">
    //           <ul>
    //             <li>
    //               <a href="#">Home</a>
    //               <IoIosArrowForward />
    //             </li>
    //             <li>
    //               <a href="#">Mobiles</a>
    //               <IoIosArrowForward />
    //             </li>
    //             <li>
    //               <a href="#">Samsung</a>
    //               <IoIosArrowForward />
    //             </li>
    //             <li>
    //               <a href="#">{product.name}</a>
    //             </li>
    //           </ul>
    //         </div>
    //         {/* product description */}
    //         <div className="productDetails">
    //           <p className="productTitle">{product.name}</p>
    //           <div>
    //             <span className="ratingCount">
    //               4.3 <IoIosStar />
    //             </span>
    //             <span className="ratingNumbersReviews">
    //               72,234 Ratings & 8,140 Reviews
    //       </span>
    //           </div>
    //           <div className="extraOffer">
    //             Extra CA$
    //       4500 off{" "}
    //           </div>
    //           <div className="flexRow priceContainer">
    //             <span className="price">
    //             CA${product.price}
    //             </span>
    //             <span className="discount" style={{ margin: "0 10px" }}>
    //               22% off
    //       </span>
    //             {/* <span>i</span> */}
    //           </div>
    //           <div>
    //             <p
    //               style={{
    //                 color: "#212121",
    //                 fontSize: "14px",
    //                 fontWeight: "600",
    //               }}
    //             >
    //               Available Offers
    //               <div>
    //                 {product.countInStock > 0 ? (
    //                   <span className="success">In Stock</span>
    //                 ) : (
    //                   <span className="danger">Unavailable</span>
    //                 )}
    //               </div>
    //               {product.countInStock > 0 && (
    //             <>
    //               <li>
    //                 <div className="row">
    //                   <div>Qty</div>
    //                   <div>
    //                     <select
    //                       value={qty}
    //                       onChange={(e) => setQty(e.target.value)}
    //                     >
    //                       {[...Array(product.countInStock).keys()].map(
    //                         (x) => (
    //                           <option key={x + 1} value={x + 1}>
    //                             {x + 1}
    //                           </option>
    //                         )
    //                       )}
    //                     </select>
    //                   </div>
    //                 </div>
    //               </li>


    //             </>
    //           )}
    //       </p>
    //       <div>

    //       <Rating
    //   rating={product.rating}
    //   numReviews={product.numReviews}
    // ></Rating>



    //     <h2 id="reviews">Reviews</h2>
    //     {product.reviews.length === 0 && (
    //       <MessageBox>There is no review</MessageBox>
    //     )}
    //     <ul>
    //       {product.reviews.map((review) => (
    //         <li key={review._id}>
    //           <strong>{review.name}</strong>
    //           <Rating rating={review.rating} caption=" "></Rating>
    //           <p>{review.createdAt.substring(0, 10)}</p>
    //           <p>{review.comment}</p>
    //         </li>
    //       ))}
    //       <li>
    //         {userInfo ? (
    //           <form className="form" onSubmit={submitHandler}>
    //             <div>
    //               <h2>Write a customer review</h2>
    //             </div>
    //             <div>
    //               <label htmlFor="rating">Rating</label>
    //               {[...Array(5)].map((star,i)=>{
    //                 const ratingValue=i+1;
    //                 return(
    //                   <label>
    //                    <input className="rattingInput" type="radio" name="rating" value={ratingValue}
    //                      onClick={() => setRating(ratingValue) }
    //                      />

    //                 <IoIosStar className="star" color={ratingValue <= (hover||rating) ? "#ffc107":"#e4e5e9"} size={25}
    //                    onMouseEnter={()=>setHover(ratingValue)}
    //                     onMouseLeave={()=>setHover(null)}/></label>);
    //               })}

    //             </div>
    //             <div>
    //               <label htmlFor="comment">Comment</label>
    //               <textarea
    //                 id="comment"
    //                 value={comment}
    //                 onChange={(e) => setComment(e.target.value)}
    //               ></textarea>
    //             </div>
    //             <div>
    //               <label />
    //               <button className="primary" type="submit">
    //                 Submit
    //               </button>
    //             </div>
    //             <div>
    //               {loadingReviewCreate && <LoadingBox></LoadingBox>}
    //               {errorReviewCreate && (
    //                 <MessageBox variant="danger">
    //                   {errorReviewCreate}
    //                 </MessageBox>
    //               )}
    //             </div>
    //           </form>
    //         ) : (
    //           <MessageBox>
    //             Please <Link to="/signin">Sign In</Link> to write a review
    //           </MessageBox>
    //         )}
    //       </li>
    //     </ul>
    //   </div>
    //             <p style={{ display: "flex" }}>
    //               <span
    //                 style={{
    //                   width: "100px",
    //                   fontSize: "12px",
    //                   color: "#878787",
    //                   fontWeight: "600",
    //                   marginRight: "20px",
    //                 }}
    //               >
    //                 Description
    //         </span>
    //               <span
    //                 style={{
    //                   fontSize: "12px",
    //                   color: "#212121",
    //                 }}
    //               >
    //                 {product.description}
    //               </span>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>



  )
}
