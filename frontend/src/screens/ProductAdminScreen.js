import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Modal, Button,Table } from 'react-bootstrap';
import AdminHomeScreen from './AdminHomeScreen';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addProduct, listProducts } from '../actions/productActions';



export default function ProductAdminScreen(props) {
  const productList = useSelector((state) => state.productList);
  //const {loading, error, products } = productList;
  const {
    loading: loadingList,
    error: errorList,
    products: listProduct,
  } = productList;
  const [name, setName] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);
 

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("countInStock", countInStock);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
        form.append("productPictures", pic);
    }
    
    dispatch(addProduct(form));
    setShow(false);
  }

  const handleShow = () => setShow(true);

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const deleteHandler = () => {
    /// TODO: dispatch delete action
  };
    return (
        <div>
              <AdminHomeScreen />
              <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={handleShow}>
         Add Product
        </button>
      </div>
      {loadingList ? (
        <LoadingBox></LoadingBox>
      ) : errorList ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table striped bordered hover style={{fontSize:12,border:15,margin:15}}  responsive="lg">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>CountInStock</th>
              <th>Description</th>
              <th>product Pictures</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.description}</td>
                <td>{product.productPictures.map(picture => <div className="productImgContainer">
          <img src={`http://localhost:3001/public/${picture.img}`}/>
        </div>)}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input type="text" className="form-control"
            label="Name"
            value={name}
            placeholder={'Product Name'}
            onChange={(e) => setName(e.target.value)}
          />


        <input  className="form-control"
          label="countInStock"
          value={countInStock}
          placeholder={`countInStock`}
          onChange={(e) => setCountInStock(e.target.value)}
        />
        <input  className="form-control"
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="text" className="form-control"
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />

{loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
                <>
                  <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}><option>select category</option>
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

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}

        <input type="file" name="productPicture" onChange={handleProductPictures}/>
         
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}
