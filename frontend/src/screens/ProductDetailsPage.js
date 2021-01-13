import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { generatePublicUrl } from '../urlConfig';
import HomeScreen from './MenueHeader';
import { AiFillThunderbolt } from "react-icons/ai";
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

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
      <HomeScreen />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div className="productDescriptionContainer">
              <div className="flexRow">
                <div className="verticalImageStack">
                  {product.productPictures.map((thumb, index) => (
                    <div className="thumbnail">
                      <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                    </div>
                  ))}
                </div>
                <div className="productDescContainer">
                  <div className="productDescImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt={`${product.productPictures[0].img}`}
                    />
                  </div>

                  {/* action buttons */}
                  <div className="flexRow">
                    <button className="btnAddtoCart" onClick={addToCartHandler}
                      style={{
                        marginRight: "5px"
                      }}><IoMdCart /> <span>ADD TO CART</span></button>

                    <button className="btnBuyNow"
                      style={{ marginLeft: "5px" }}
                    ><AiFillThunderbolt /><span>BUY NOW</span></button>
                  </div>
                </div>
              </div>
              <div>
                {/* home > category > subCategory > productName */}
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
                {/* product description */}
                <div className="productDetails">
                  <p className="productTitle">{product.name}</p>
                  <div>
                    <span className="ratingCount">
                      4.3 <IoIosStar />
                    </span>
                    <span className="ratingNumbersReviews">
                      72,234 Ratings & 8,140 Reviews
              </span>
                  </div>
                  <div className="extraOffer">
                    Extra CA$
              4500 off{" "}
                  </div>
                  <div className="flexRow priceContainer">
                    <span className="price">
                    CA${product.price}
                    </span>
                    <span className="discount" style={{ margin: "0 10px" }}>
                      22% off
              </span>
                    {/* <span>i</span> */}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#212121",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Available Offers
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                      {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                     
                     
                    </>
                  )}
              </p>
              <div>

              <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>



            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
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
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
                    <p style={{ display: "flex" }}>
                      <span
                        style={{
                          width: "100px",
                          fontSize: "12px",
                          color: "#878787",
                          fontWeight: "600",
                          marginRight: "20px",
                        }}
                      >
                        Description
                </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#212121",
                        }}
                      >
                        {product.description}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          )}
    </div>

  )
}
