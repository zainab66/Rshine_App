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


export default function ProductDetailsPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [qty, setQty] = useState(1);

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
    props.history.push(`/cart/${productId}?qty=${qty}`);
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
                   <a href="#">Home</a>
                   <IoIosArrowForward />
                 </li>
                 <li>
                   <a href="#">Mobiles</a>
                   <IoIosArrowForward />
                 </li>
                <li>
                  <a href="#">Samsung</a>
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

                  <div class="col-12 mb-0">
                    <figure class="img-hover-zoom view overlay rounded z-depth-1 main-img " style={{ marginBottom: 10 ,maxHeight:450}} >
                     
                        <img src={generatePublicUrl(product.productPictures[0].img)}
                          class="img-fluid z-depth-1" alt={`${product.productPictures[0].img}`} />
                      
                    </figure>

                  </div>
                  <div class="col-12">
                    <div class="row">
                    {product.productPictures.map((thumb, index) => (
                      <div class="col-3">
                        <div class="view overlay rounded z-depth-1 gallery-item hoverable">
                       
                        <img src={generatePublicUrl(thumb.img)} alt={thumb.img}
                          class="img-fluid " />
                    
                          <div class="mask rgba-white-slight"></div>
                        </div>
                      </div>
))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-md-6">

              <h5>{product.name}</h5>
              <p class="mb-2 text-muted text-uppercase small">{product.category}</p>
              <Rating
rating={product.rating}
   numReviews={product.numReviews}
              ></Rating>

              <p><span class="mr-1"><strong> CA${product.price}</strong></span></p>
              <p class="pt-1"> {product.description}</p>
              <div class="table-responsive">
                <table class="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>Size</strong></th>
                      <td>Shirt 5407X</td>
                    </tr>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>Material</strong></th>
                      <td>Blue</td>
                    </tr>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>Color</strong></th>
                      <td>USA, Europe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div class="table-responsive mb-2">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <td class="pl-0 pb-0 w-25">Quantity</td>
                      <td class="pb-0">  {product.countInStock > 0 ? (
                       <span className="success">In Stock</span>
                     ) : (
                       <span className="danger">Unavailable</span>
                    )}</td>
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
              <button type="button" class="btn btn-primary btn-md mr-1 mb-2">Go to Shopping</button>
              <button type="button" class="btn btn-secondary btn-md mr-1 mb-2" onClick={addToCartHandler}><IoMdCart /><span>ADD TO CART</span></button>
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
   numReviews={product.numReviews}
              ></Rating>
              <h6>CA${product.price}</h6>
              <p class="pt-1">{product.description}</p>
            </div>
            <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
              <h5>Additional Information</h5>
              <table class="table table-striped table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="row" class="w-150 dark-grey-text h6">Weight</th>
                    <td><em>0.3 kg</em></td>
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
              </div>   </> ))}
              <hr />
              {userInfo ? ( <form className="form" onSubmit={submitHandler}>
              <h5 class="mt-4">Add a review</h5>
              <p>Your email address will not be published.</p>
              <div class="my-3">
                 <div>
                   <label htmlFor="rating">Rating</label>
                  {[...Array(5)].map((star,i)=>{
                    const ratingValue=i+1;
                    return(
                      <label>
                       <input className="rattingInput" type="radio" name="rating" value={ratingValue}
                         onClick={() => setRating(ratingValue) }
                          />

                     <IoIosStar className="star" color={ratingValue <= (hover||rating) ? "#ffc107":"#e4e5e9"} size={25}
                        onMouseEnter={()=>setHover(ratingValue)}
                         onMouseLeave={()=>setHover(null)}/></label>);
                   })}

                 </div>
              </div>
              <div>
                <div class="md-form md-outline">
                  <textarea  class="md-textarea form-control pr-6" rows="4" id="comment" value={comment}
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
              ):( <MessageBox>
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
