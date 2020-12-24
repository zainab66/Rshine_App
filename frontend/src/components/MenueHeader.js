import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Col, Container, Row} from 'react-bootstrap';
import { getAllCategory } from './actions/categoryActions';


export default function MenueHeader() {
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    const dispatch = useDispatch();
    
  
  
    useEffect(() => {
        dispatch(getAllCategory());
      }, []);
    
   
  
    return (
        <div>
        {/* // <div className="MenueHeader"> */}
{/*          
     <ul>

            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (

                  <>

                    <ul className="list-group list-group-flush">
                      {categories.map((category) => (
                        <li className="list-group-item" key={category.name}>
                          <h5>{category.name}</h5>


                          {category.children.map((sub) =>
                            <li key={sub.name}>
                              {sub.name}

                              {sub.children.map((subb) =>
                                <li className="list-group-item" key={subb.name}>
                                  {subb.name}
                                </li>)}

                            </li>)}


                        </li>
                      ))}
                    </ul>
                  </>





                )}
    </ul>
 */}

     
    </div>
  );
      
    
    
    
}
