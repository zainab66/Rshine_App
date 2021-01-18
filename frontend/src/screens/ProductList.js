import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from "react-router-dom";
import{generatePublicUrl} from '../urlConfig';




export default function ProductList() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts({}));
       
      }, [dispatch]);
    return (
        <main role="main">

      
        <div class="album py-5 bg-light">
          <div class="container">
      
            <div class="row">
            {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        {products.map((product) => {
             return(
              <div class="col-md-4">

                <div class="">
                <Link  to={`/${product.slug}/${product._id}/p`}>
<div class="img-hover-zoom">

                <img class="  img-fluid w-100"
                  src={generatePublicUrl(product.productPictures[0].img)} alt="Sample"/>
                
               
                
              </div>                 
              </Link>
                  <div class="card-body">
                  <div class="text-center pt-2">

<h5>{product.name}</h5>
<p><span class="mr-1"><strong>CA${product.price}</strong></span></p>

</div>
                  </div>
                </div>
              </div>

             )})}
              </>)}
              </div>
              </div>
              </div>


            {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
         
        <div class="row">
          <div class="col-md-4 mb-5">
            <div class="item">
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            {products.map((product) => {
                 return(

                    <Link  to={`/${product.slug}/${product._id}/p`}>
              <>
              <div class="view zoom overlay rounded z-depth-2">
                <img class="img-fluid w-100"
                  src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample"/>
                <a href="#!">
                  <div class="mask">
                    <img class="img-fluid w-100"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" alt=""/>
                    <div class="mask rgba-black-slight"></div>
                  </div>
                </a>
              </div>
            
              <div class="text-center pt-4">

                <h5>{product.name}</h5>
                <p><span class="mr-1"><strong>${product.price}</strong></span></p>

              </div>
              </>
             
              </Link>)}
            )}
  
            </div>
          </div>
        </div></>
        )} */}
        
        </main>
    )
}
