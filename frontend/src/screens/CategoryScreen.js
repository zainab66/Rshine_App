import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import AdminHomeScreen from './AdminHomeScreen';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';




export default function CategoryScreen(props) {

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());


  }, [dispatch]);


  //    const renderCategories = (categories)  => {

  //        let myCategories = [];

  //       for(let category of categories){
  //         myCategories.push(
  //           {
  //               label: category.name,
  //               value: category._id,
  //               children: category.children.length > 0 && renderCategories(category.children)
  //           }
  //       );
  //   }
  //   return myCategories;
  // }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <AdminHomeScreen />
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <Button onClick={handleShow}>Add</Button>
            </div>

          </Col>
        </Row>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (


            <>
                {categories.map((category) => (
                  <li key={category.name}>
                    {category.name}


                    {category.children.map((sub) =>
                      <li className="list-group-item" key={sub.name}>
                        {sub.name}

                        {sub.children.map((sub) =>
                          <li className="list-group-item" key={sub.name}>
                            {sub.name}
                          </li>)}

                      </li>)}


                  </li>
                ))}

              </>





            )}
      </Container>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
          value={categoryName}
          placeholder={'Category Name'}
          onChange={(e) => setCategoryName(e.target.value)}
          />

          <select> <option>select category</option> {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (


              <>
                {categories.map((category) => (
                  <option key={category.name} value={category.value}>
                    {category.name}


                    {category.children.map((sub) =>
                      
                        <option key={sub.name} value={sub.value}>
                    {sub.name}
                        {sub.children.map((sub) =>
                          <option key={sub.name}>
                            {sub.name}
                          </option>)}

                      </option>)}



                   


                  </option>
                ))}
</>
            





            )}
</select>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}