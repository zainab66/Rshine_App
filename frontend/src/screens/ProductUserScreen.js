import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './MenueHeader';
import { getProductsBySlug } from '../actions/productActions';
import{generatePublicUrl} from '../urlConfig';
import { Link } from "react-router-dom";




export default function ProductUserScreen(props) {
    
    const productSlug = useSelector((state) => state.productSlug);
    const { produ } = productSlug;

   // console.log('here',productSlug)
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(props)
        const{match}=props;


        dispatch(getProductsBySlug(match.params.slug));
      }, []);


    return (
        <div>

        <HomeScreen/>
        <div style={{display:'flex'}}>
        {produ.map((pp) => {
            return(

        <Link  to={`/${pp.slug}/${pp._id}/p`}
         className="productContainer">
            <div className="productImgContainer">
                
                <img src={generatePublicUrl(pp.productPictures[0].img)}   alt=""/>
            </div>
            <div className="productInfo">
                <div>{pp.name}</div> 
                <div><span>4.3</span>
                <span>666544</span></div>
                <div>{pp.price}</div>
            </div>
        </Link>
        )})}</div>
        </div>
    )
}
