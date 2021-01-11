import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory,addCategory, updateCategories, deleteCategoriesAction
} from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import AdminHomeScreen from './AdminHomeScreen';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload
} from 'react-icons/io'



export default function CategoryScreen(props) {

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));
    setShow(false);
  }

  const handleShow = () => setShow(true);

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }


  const renderCategories = () => {

    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          value: category._id,
          name: category.name,
          parentId: category.parentId

        }
      );
      for (let cate of category.childr) {
        myCategories.push(
          {
            value: cate._id,
            name: cate.name,
            parentId: cate.parentId
          }

        );
        for (let catego of cate.childr) {
          myCategories.push(
            {
              value: catego._id,
              name: catego.name,
              parentId: catego.parentId
            }

          );


        }
      }
    }
    return myCategories;
  }

  const updateCategory = () => {
    setUpdateCategoryModal(true);

    const categoryAll = renderCategories();

    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categoryAll.find((category, _index) => categoryId === category.value)
      category && checkedArray.push(category);
      console.log('cc', category)
    })

    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categoryAll.find((category, _index) => categoryId === category.value)
      category && expandedArray.push(category);
      console.log(category)
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);

    console.log({ checked, expanded, categoryAll, checkedArray, expandedArray });
  }

  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);
    if (type === "checked") {
        const updatedCheckedArray = checkedArray.map((item, _index) =>
            index === _index ? { ...item, [key]: value } : item);
        setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
        const updatedExpandedArray = expandedArray.map((item, _index) =>
            index === _index ? { ...item, [key]: value } : item);
        setExpandedArray(updatedExpandedArray);
    }
  }

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
        form.append('_id', item.value);
        form.append('name', item.name);
        form.append('parentId', item.parentId ? item.parentId : "");
        form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
        form.append('_id', item.value);
        form.append('name', item.name);
        form.append('parentId', item.parentId ? item.parentId : "");
        form.append('type', item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
}

const updateCheckedAndExpandedCategories = () => {
  const categoryAll = renderCategories();

  const checkedArray = [];
  const expandedArray = [];

  checked.length > 0 && checked.forEach((categoryId, index) => {
    const category = categoryAll.find((category, _index) => categoryId === category.value)
    category && checkedArray.push(category);
    console.log('cc', category)
  })

  expanded.length > 0 && expanded.forEach((categoryId, index) => {
    const category = categoryAll.find((category, _index) => categoryId === category.value)
    category && expandedArray.push(category);
    console.log(category)
  })
  setCheckedArray(checkedArray);
  setExpandedArray(expandedArray);

}
const renderDeleteCategoryModal = () => {
  updateCheckedAndExpandedCategories();
  setDeleteCategoryModal(true);  
}

const deleteCategories = () => {
  const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
  //const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
  //const idsArray = expandedIdsArray.concat(checkedIdsArray);
 // dispatch(deleteCategoriesAction(idsArray))
  if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray))
          .then(result => {
              if (result) {
                  dispatch(getAllCategory())
                  setDeleteCategoryModal(false)
              }
          });
  }

  setDeleteCategoryModal(false);

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
                  <CheckboxTree
                    nodes=
                    {categories.map((category) => (
                      {
                        label: category.name,
                        value: category._id,
                        children:
                        category.childr.length > 0 && category.childr.map((sub) => (
                            {
                              label: sub.name,
                              value: sub._id,
                              children:
                              sub.childr.length > 0 && sub.childr.map((subb) => (
                                  {
                                    label: subb.name,
                                    value: subb._id,
                                  }))
                            })),
                      }
                    ))}

                    checked={checked}
                    expanded={expanded}
                    onCheck={checked => setChecked(checked)}
                    onExpand={expanded => setExpanded(expanded)}
                    icons={{
                      check: <IoIosCheckbox />,
                      uncheck: <IoIosCheckboxOutline />,
                      halfCheck: <IoIosCheckboxOutline />,
                      expandClose: <IoIosArrowForward />,
                      expandOpen: <IoIosArrowDown />
                    }}
                  />
                )}
          </Col>
        </Row>
        <Row>
          <Col>
            <button  onClick={renderDeleteCategoryModal}><IoIosTrash /> <span>Delete</span></button>
            <button onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></button>

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
                        {category.childr.map((sub) =>
                          <>
                            <option key={sub._id} value={sub._id}>  {sub.name}</option>

                            {sub.childr.map((subb) =>

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




      {/* Edit Categories */}
      <Modal size="lg" show={updateCategoryModal}  onHide={() => setUpdateCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h6>Expanded</h6>
            </Col>
          </Row>

          {
            expandedArray.length > 0 && expandedArray.map((item, index) =>
              <Row key={index}>
                <Col>
                  <input type="text" className="form-control"
                    value={item.name}
                    placeholder={'Category Name'}
                    onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')}
                  />
                </Col>
                <Col>

                  {loading ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (


                        <>
                          <select className="form-control" value={item.parentId} onChange={(e) =>  handleCategoryInput('parentId',e.target.value,index,'expanded')}><option>select category</option>
                            {categories.map((category) => (


                              <>
                                <option key={category._id} value={category._id}> {category.name}</option>
                                {category.childr.map((sub) =>
                                  <>
                                    <option key={sub._id} value={sub._id}>  {sub.name}</option>

                                    {sub.childr.map((subb) =>

                                      <option key={subb._id} value={subb._id}>  {subb.name}</option>

                                    )}
                                  </>
                                )}
                              </>))}
                          </select>

                        </>

                      )}

                </Col>

              </Row>



            )

          }

<Row>
            <Col>
              <h6>Checked</h6>
            </Col>
          </Row>

          {
            checkedArray.length > 0 && checkedArray.map((item, index) =>
              <Row key={index}>
                <Col>
                  <input type="text" className="form-control"
                    value={item.name}
                    placeholder={'Category Name'}
                    onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')}
                  />
                </Col>
                <Col>

                  {loading ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (


                        <>
                          <select className="form-control" value={item.parentId} onChange={(e) =>  handleCategoryInput('parentId',e.target.value,index,'checked')}><option>select category</option>
                            {categories.map((category) => (


                              <>
                                <option key={category._id} value={category._id}> {category.name}</option>
                                {category.childr.map((sub) =>
                                  <>
                                    <option key={sub._id} value={sub._id}>  {sub.name}</option>

                                    {sub.childr.map((subb) =>

                                      <option key={subb._id} value={subb._id}>  {subb.name}</option>

                                    )}
                                  </>
                                )}
                              </>))}
                          </select>

                        </>

                      )}

                </Col>

              </Row>



            )

          }


          {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={updateCategoriesForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Delete Categories */}
      <Modal size="lg" show={deleteCategoryModal}  onHide={() => setDeleteCategoryModal(false)}  buttons={[
              {
                  label: 'No',
                  color: 'primary',
                  onClick: () => {
                      alert('no');
                  }
              },
              {
                  label: 'Yes',
                  color: 'danger',
                  // onClick: deleteCategories
              }
          ]}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      

         
        <h5>Expanded</h5>
          { expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
          <h5>Checked</h5>
          { checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}





          {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={renderDeleteCategoryModal}>
          No         
          </Button> 
          
          <Button variant="danger" onClick= {deleteCategories}>
            Yes
            </Button>
        
        </Modal.Footer>
      </Modal>







    </div>
  );
}