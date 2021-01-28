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
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [madeBy, setMadeBy] = useState("");
  const [material, setMaterial] = useState("");
  const [costToDeliver, setCostToDeliver] = useState("");
  const [readyToDispatch, setReadyToDispatch] = useState("");
  const [sizeOption1, setSizeOption1] = useState("");
  const [sizeOption2, setSizeOption2] = useState("");
  const [colorOption1, setColorOption1] = useState("");
  const [colorOption2, setColorOption2] = useState("");
  const [colorOption3, setColorOption3] = useState("");
  const [colorOption4, setColorOption4] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [option6, setOption6] = useState("");
  const [option7, setOption7] = useState("");
  const [option8, setOption8] = useState("");
  const [option9, setOption9] = useState("");
  const [option10, setOption10] = useState("");

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
    form.append("discountPrice", discountPrice);
    form.append("price", price);
    form.append("madeBy", madeBy);
    form.append("material", material);
    form.append("costToDeliver", costToDeliver);
    form.append("readyToDispatch", readyToDispatch);
    form.append("sizeOption1", sizeOption1);
    form.append("sizeOption2", sizeOption2);
    form.append("colorOption1",colorOption1);
    form.append("colorOption2", colorOption2);
    form.append("colorOption3", colorOption3);
    form.append("colorOption4", colorOption4);
    form.append("option1", option1);
    form.append("option2", option2);
    form.append("option3", option3);
    form.append("option4", option4);
    form.append("option5", option5);
    form.append("option6", option6);
    form.append("option7", option7);
    form.append("option8", option8);
    form.append("option9", option9);
    form.append("option10", option10);

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
              <th>discountPrice</th>
              <th>CATEGORY</th>
              <th>CountInStock</th>
              <th>Description</th>
              <th>madeBy</th>
              <th>material</th>
              <th>sizeOption1</th>
              <th>sizeOption2</th>
              <th>colorOption1</th>
              <th>colorOption2</th>
              <th>colorOption3</th>
              <th>colorOption4</th>
              <th>option1</th>
              <th>option2</th>
              <th>option3</th>
              <th>option4</th>
              <th>option5</th>
              <th>option6</th>
              <th>option7</th>
              <th>option8</th>
              <th>option9</th>
              <th>option10</th>
              <th>costToDeliver</th>
              <th>readyToDispatch</th>
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
                <td>{product.discountPrice}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.description}</td>
                <td>{product.madeBy}</td>
                <td>{product.material}</td>
                <td>{product.sizeOption1}</td>
                <td>{product.sizeOption2}</td>
                <td>{product.colorOption1}</td>
                <td>{product.colorOption2}</td>
                <td>{product.colorOption3}</td>
                <td>{product.colorOption4}</td>
                <td>{product.option1}</td>
                <td>{product.option2}</td>
                <td>{product.option3}</td>
                <td>{product.option4}</td>
                <td>{product.option5}</td>
                <td>{product.option6}</td>
                <td>{product.option7}</td>
                <td>{product.option8}</td>
                <td>{product.option9}</td>
                <td>{product.option10}</td>
                <td>{product.costToDeliver}</td>
                <td>{product.readyToDispatch}</td>


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
          <input  className="form-control"
          label="discountPrice"
          value={discountPrice}
          placeholder={`discountPrice`}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
        <input type="text" className="form-control"
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
         <input type="text" className="form-control"
          label="madeBy"
          value={madeBy}
          placeholder={`madeBy`}
          onChange={(e) => setMadeBy(e.target.value)}
        />
         <input type="text" className="form-control"
          label="material"
          value={material}
          placeholder={`material`}
          onChange={(e) => setMaterial(e.target.value)}
        />
         <input type="text" className="form-control"
          label="sizeOption1"
          value={sizeOption1}
          placeholder={`sizeOption1`}
          onChange={(e) => setSizeOption1(e.target.value)}
        />
         <input type="text" className="form-control"
          label="sizeOption2"
          value={sizeOption2}
          placeholder={`sizeOption2`}
          onChange={(e) => setSizeOption2(e.target.value)}
        />
         <input type="text" className="form-control"
          label="colorOption1"
          value={colorOption1}
          placeholder={`colorOption1`}
          onChange={(e) => setColorOption1(e.target.value)}
        />
         <input type="text" className="form-control"
          label="colorOption2"
          value={colorOption2}
          placeholder={`colorOption2`}
          onChange={(e) => setColorOption2(e.target.value)}
        />
         <input type="text" className="form-control"
          label="colorOption3"
          value={colorOption3}
          placeholder={`colorOption3`}
          onChange={(e) => setColorOption3(e.target.value)}
        />
         <input type="text" className="form-control"
          label="colorOption4"
          value={colorOption4}
          placeholder={`colorOption4`}
          onChange={(e) => setColorOption4(e.target.value)}
        />




<input type="text" className="form-control"
          label="option1"
          value={option1}
          placeholder={`option1`}
          onChange={(e) => setOption1(e.target.value)}
        />

<input type="text" className="form-control"
          label="option2"
          value={option2}
          placeholder={`option2`}
          onChange={(e) => setOption2(e.target.value)}
        />

<input type="text" className="form-control"
          label="option3"
          value={option3}
          placeholder={`option3`}
          onChange={(e) => setOption3(e.target.value)}
        />

<input type="text" className="form-control"
          label="option4"
          value={option4}
          placeholder={`option4`}
          onChange={(e) => setOption4(e.target.value)}
        />

<input type="text" className="form-control"
          label="option5"
          value={option5}
          placeholder={`option5`}
          onChange={(e) => setOption5(e.target.value)}
        />

<input type="text" className="form-control"
          label="option6"
          value={option6}
          placeholder={`option6`}
          onChange={(e) => setOption6(e.target.value)}
        />


<input type="text" className="form-control"
          label="option7"
          value={option7}
          placeholder={`option7`}
          onChange={(e) => setOption7(e.target.value)}
        />


<input type="text" className="form-control"
          label="option8"
          value={option8}
          placeholder={`option8`}
          onChange={(e) => setOption8(e.target.value)}
        />


<input type="text" className="form-control"
          label="option9"
          value={option9}
          placeholder={`option9`}
          onChange={(e) => setOption9(e.target.value)}
        />


<input type="text" className="form-control"
          label="option10"
          value={option10}
          placeholder={`option10`}
          onChange={(e) => setOption10(e.target.value)}
        />
<input type="text" className="form-control"
          label="costToDeliver"
          value={costToDeliver}
          placeholder={`costToDeliver`}
          onChange={(e) => setCostToDeliver(e.target.value)}
        />
<input type="text" className="form-control"
          label="readyToDispatch"
          value={readyToDispatch}
          placeholder={`readyToDispatch`}
          onChange={(e) => setReadyToDispatch(e.target.value)}
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
