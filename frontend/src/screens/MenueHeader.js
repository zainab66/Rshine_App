import React, {useEffect} from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { getAllCategory } from '../actions/categoryActions';
import {NavLink} from 'react-router-dom';


export default function MenueHeader() {
  // const dispatch = useDispatch();
  // const productList = useSelector(state => state.productList);
  // const { loading, error, products } = productList;

  // useEffect(() => {
  //   dispatch(listProducts({}));
  // }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const dispatch = useDispatch();
  


  useEffect(() => {
      dispatch(getAllCategory());
    }, []);
    return (
    //     <div>
    //       {loading ? (
    //     <LoadingBox></LoadingBox>
    //   ) : error ? (
    //     <MessageBox variant="danger">{error}</MessageBox>
    //   ): (
    //     <div className="row center">
    //       {products.map((product) => ( 
    //       <Product key={product._id} product={product}></Product>
    //       ))}
    //     </div>
    //   )}
    //   </div>
    // );

    <div className="MenueHeader">
         
   

           {loading ? (
             <LoadingBox></LoadingBox>
           ) : error ? (
             <MessageBox variant="danger">{error}</MessageBox>
           ) : (

                 <>

                   <ul >
                     {categories.map((category) => (
                       <li  key={category.name}>
                         <span>{category.name}</span>

<ul>
                         {category.childr.map((sub) =>
                           <li key={sub.name}><a href={`/${sub.slug}`}>
                             {sub.name}
                           </a>
<ul>
                             {sub.childr.map((subb) =>
                               <li  key={subb.name}><a href={`/${subb.slug}`}>
                                 {subb.name}
                             </a>
                               </li>)}</ul>

                           </li>)}</ul>


                       </li>
                     ))}
                   </ul>
                 </>





               )}
   


   </div>
 );
     
}
