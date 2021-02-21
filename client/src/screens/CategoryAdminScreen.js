import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories, deleteCategoriesAction } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


export default function CategoryAdminScreen(props) {

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
    <div className="categoryAdminScreen">
      <div className="container">
        <div class="row">
          <div class="col-5"><h2 className="categoryTittle">Categories</h2> {loading ? (
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
                    check: <span className="rct-icon rct-icon-check" />,
                    uncheck: <span className="rct-icon rct-icon-uncheck" />,
                    halfCheck: <span className="rct-icon rct-icon-half-check" />,
                    expandClose: <span className="rct-icon rct-icon-expand-close" />,
                    expandOpen: <span className="rct-icon rct-icon-expand-open" />
                  }}
                />
              )}</div>
          <div class="col-7"><button className="categoryActions" onClick={handleShow}><i class="fas fa-plus"></i><span>Add</span></button><button className="categoryActions" onClick={updateCategory}><i class="fas fa-edit"></i> <span>Edit</span></button><button className="categoryActions" onClick={renderDeleteCategoryModal}><i class="far fa-trash-alt"></i> <span>Delete</span></button></div>
        </div>

        {/*addCategoryModal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h2 className="AddNewCategory">Add New Category</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="formAddCategory">
              <label for="inputCategoryName" class="categoryFormLabel">Category Name</label>
              <input type="text" id="inputCategoryName" class="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                    <>
                      <label for="option" class="categoryFormLabel">Categories</label>
                      <select class="custom-select d-block w-100 mb-4" id="option" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)} required>
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <>
                            <option key={category._id} value={category._id}> {category.name}</option>
                            {/* {category.childr.map((sub) =>
                              <>
                                <option key={sub._id} value={sub._id}>  {sub.name}</option>
                                {sub.childr.map((subb) =>
                                  <option key={subb._id} value={subb._id}>  {subb.name}</option>
                                )}
                              </>
                            )} */}
                          </>))}
                      </select>
                    </>
                  )}
              <label for="inputcategoryImage" class="categoryFormLabel">Select Image</label>
              <input type="file" class="form-control" name="categoryImage" onChange={handleCategoryImage} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'black', background: '#00bbcc', borderRadius: 25, borderColor: '#ffd480' }} onClick={handleClose}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>

        {/*editCategoryModal */}
        <Modal size="lg" show={updateCategoryModal} onHide={() => setUpdateCategoryModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title><h2 className="AddNewCategory">Update Categories</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h2 className="EditCategory">Expanded<span className="ParentsCategory ml-1">(Parents Category)</span></h2>
              </Col>
            </Row>
            {
              expandedArray.length > 0 && expandedArray.map((item, index) =>
                <Row key={index}>
                  <Col>
                    <input type="text" className="form-control mb-4"
                      value={item.name}
                      placeholder={'Category Name'}
                      onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                    />
                  </Col>
                  <Col>
                    {loading ? (
                      <LoadingBox></LoadingBox>
                    ) : error ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                          <>
                            <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}><option>select category</option>
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

            <Row className="mt-4">
              <Col>
                <h2 className="EditCategory">Checked<span className="ParentsCategory ml-1">(Subs Category)</span></h2>
              </Col>
            </Row>
            {
              checkedArray.length > 0 && checkedArray.map((item, index) =>
                <Row key={index}>
                  <Col>
                    <input type="text" className="form-control mb-4"
                      value={item.name}
                      placeholder={'Category Name'}
                      onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                    />
                  </Col>
                  <Col>
                    {loading ? (
                      <LoadingBox></LoadingBox>
                    ) : error ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                          <>
                            <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}><option>select category</option>
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
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'black', background: '#00bbcc', borderRadius: 25, borderColor: '#ffd480' }} onClick={updateCategoriesForm}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>

        {/*deleteCategoryModal */}
        <Modal size="lg" show={deleteCategoryModal} onHide={() => setDeleteCategoryModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2 className="EditCategory">Expanded<span className="ParentsCategory ml-1">(Parents Category)</span></h2>
            {expandedArray.map((item, index) => <span key={index}> <ul class="list-group">
              <li class="list-group-item">{item.name}</li></ul></span>)}
            <h2 className="EditCategory mt-4">Checked<span className="ParentsCategory ml-1">(Subs Category)</span></h2>
            {checkedArray.map((item, index) => <span key={index}><ul class="list-group">
              <li class="list-group-item">{item.name}</li></ul></span>)}
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'black', background: '#00bbcc', borderRadius: 25, borderColor: '#ffd480' }} onClick={() => setDeleteCategoryModal(false)}>
              No
          </Button>
            <Button style={{ color: 'black', background: '#00bbcc', borderRadius: 25, borderColor: '#ffd480' }} onClick={deleteCategories}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}