import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../actions/categoryActions';
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
  


  const handleClose = () => {
    const form = new FormData();

    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));
   







    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage
    // };
    //console.log(cat);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }




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
        <Row>
          <Col md={12}>

            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (


                  <>
                    {/* {categories.map((rowdata,i)=>
<div>
  {
  (typeof  (rowdata.children)=='object')?
  <div>
         {rowdata.children.map((subrow,k)=>
<div>
  
  {subrow.name}
  
   </div>
         )}
  </div>
  :
  null

  }
  {rowdata.name}
</div>




)} */}






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
          </Col>
        </Row>
      </Container>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control"
            value={categoryName}
            placeholder={'Category Name'}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (


                <>
                  <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}><option>select category</option>
                    {categories.map((category) => (


                      <>
                        <option key={category._id} value={category._id}> {category.name}</option>
                        {category.children.map((sub) =>
                          <>
                            <option key={sub._id} value={sub._id}>  {sub.name}</option>

                            {sub.children.map((subb) =>

                              <option key={subb._id} value={subb._id}>  {subb.name}</option>

                            )}
                          </>
                        )}
                      </>))}
                  </select>

                </>






              )}


          <input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}