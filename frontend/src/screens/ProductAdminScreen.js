import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import AdminHomeScreen from './AdminHomeScreen';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addProduct, listProducts } from '../actions/productActions';
export default function ProductAdminScreen(props) {
  const productList = useSelector((state) => state.productList);
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
  const [addYourPersonalisation, setAddYourPersonalisation] = useState("");
  const [madeBy, setMadeBy] = useState("");
  const [material, setMaterial] = useState("");
  const [standardDelivery, setStandardDelivery] = useState("");
  const [expressDelivery, setExpressDelivery] = useState("");
  const [readyToDispatchRange, setReadyToDispatchRange] = useState("");
  const [readyToDispatchDaysOrWeeks, setReadyToDispatchDaysOrWeeks] = useState("");
  const [sizeOption1, setSizeOption1] = useState("");
  const [priceSizeOption1, setPriceSizeOption1] = useState("");
  const [sizeOption2, setSizeOption2] = useState("");
  const [priceSizeOption2, setPriceSizeOption2] = useState("");
  const [colorOption1, setColorOption1] = useState("");
  const [colorOption2, setColorOption2] = useState("");
  const [colorOption3, setColorOption3] = useState("");
  const [colorOption4, setColorOption4] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [priceFirstOption, setPriceFirstOption] = useState("");
  const [sizefirstOption1, setSizefirstOption1] = useState("");
  const [priceSizefirstOption1, setPriceSizefirstOption1] = useState("");
  const [sizefirstOption2, setSizefirstOption2] = useState("");
  const [priceSizefirstOption2, setPriceSizefirstOption2] = useState("");
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
  }, [dispatch]);


  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("countInStock", countInStock);
    form.append("discountPrice", discountPrice);
    form.append("price", price);
    form.append("madeBy", madeBy);
    form.append("material", material);
    form.append("standardDelivery", standardDelivery);
    form.append("expressDelivery", expressDelivery);
    form.append("readyToDispatchRange", readyToDispatchRange);
    form.append("readyToDispatchDaysOrWeeks", readyToDispatchDaysOrWeeks);
    form.append("sizeOption1", sizeOption1);
    form.append("priceSizeOption1", priceSizeOption1);
    form.append("sizeOption2", sizeOption2);
    form.append("priceSizeOption2", priceSizeOption2);
    form.append("colorOption1", colorOption1);
    form.append("colorOption2", colorOption2);
    form.append("colorOption3", colorOption3);
    form.append("colorOption4", colorOption4);
    form.append("firstOption", firstOption);
    form.append("priceFirstOption", priceFirstOption);
    form.append("sizefirstOption1", sizefirstOption1);
    form.append("priceSizefirstOption1", priceSizefirstOption1);
    form.append("sizefirstOption2", sizefirstOption2);
    form.append("priceSizefirstOption2", priceSizefirstOption2);
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
    form.append("addYourPersonalisation", addYourPersonalisation);
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
            <Table striped bordered hover style={{ fontSize: 12, border: 15, margin: 15 }} responsive="lg">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>discountPrice</th>
                  <th>CATEGORY</th>
                  <th>CountInStock</th>
                  <th>Description</th>
                  <th>AddYourPersonalisation</th>
                  <th>madeBy</th>
                  <th>material</th>
                  <th>sizeOption1</th>
                  <th>priceSizeOption1</th>
                  <th>sizeOption2</th>
                  <th>priceSizeOption2</th>
                  <th>colorOption1</th>
                  <th>colorOption2</th>
                  <th>colorOption3</th>
                  <th>colorOption4</th>
                  <th>firstOption</th>
                  <th>priceFirstOption</th>
                  <th>sizefirstOption1</th>
                  <th>priceSizefirstOption1</th>
                  <th>sizefirstOption2</th>
                  <th>priceSizefirstOption2</th>
                  <th>option2</th>
                  <th>option3</th>
                  <th>option4</th>
                  <th>option5</th>
                  <th>option6</th>
                  <th>option7</th>
                  <th>option8</th>
                  <th>option9</th>
                  <th>option10</th>
                  <th>standardDelivery</th>
                  <th>expressDelivery</th>
                  <th>readyToDispatchRange</th>
                  <th>readyToDispatchDaysOrWeeks</th>
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
                    <td>{product.addYourPersonalisation}</td>
                    <td>{product.madeBy}</td>
                    <td>{product.material}</td>
                    <td>{product.sizeOption1}</td>
                    <td>{product.priceSizeOption1}</td>
                    <td>{product.sizeOption2}</td>
                    <td>{product.priceSizeOption2}</td>
                    <td>{product.colorOption1}</td>
                    <td>{product.colorOption2}</td>
                    <td>{product.colorOption3}</td>
                    <td>{product.colorOption4}</td>
                    <td>{product.firstOption}</td>
                    <td>{product.priceFirstOption}</td>
                    <td>{product.sizefirstOption1}</td>
                    <td>{product.priceSizefirstOption1}</td>
                    <td>{product.sizefirstOption2}</td>
                    <td>{product.priceSizefirstOption2}</td>
                    <td>{product.option2}</td>
                    <td>{product.option3}</td>
                    <td>{product.option4}</td>
                    <td>{product.option5}</td>
                    <td>{product.option6}</td>
                    <td>{product.option7}</td>
                    <td>{product.option8}</td>
                    <td>{product.option9}</td>
                    <td>{product.option10}</td>
                    <td>{product.standardDelivery}</td>
                    <td>{product.expressDelivery}</td>
                    <td>{product.readyToDispatchRange}</td>
                    <td>{product.readyToDispatchDaysOrWeeks}</td>


                    <td>{product.productPictures.map(picture => <div className="productImgContainer">
                      <img src={`http://localhost:3001/public/${picture.img}`} alt="" />
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
            label="Product Name"
            value={name}
            placeholder={'Product Name'}
            onChange={(e) => setName(e.target.value)}
          />


          <input className="form-control"
            label="CountInStock"
            value={countInStock}
            placeholder={`CountInStock`}
            onChange={(e) => setCountInStock(e.target.value)}
          />
          <input className="form-control"
            label="Price"
            value={price}
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input className="form-control"
            label="DiscountPrice"
            value={discountPrice}
            placeholder={`DiscountPrice`}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
          <input type="text" className="form-control"
            label="Description"
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="text" className="form-control"
            label="AddYourPersonalisation"
            value={addYourPersonalisation}
            placeholder={`AddYourPersonalisation`}
            onChange={(e) => setAddYourPersonalisation(e.target.value)}
          />
          <input type="text" className="form-control"
            label="MadeBy"
            value={madeBy}
            placeholder={`MadeBy`}
            onChange={(e) => setMadeBy(e.target.value)}
          />
          <input type="text" className="form-control"
            label="Material"
            value={material}
            placeholder={`Material`}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <input type="text" className="form-control"
            label="SizeOption1"
            value={sizeOption1}
            placeholder={`SizeOption1`}
            onChange={(e) => setSizeOption1(e.target.value)}
          />
          <input type="text" className="form-control"
            label="PriceSizeOption1"
            value={priceSizeOption1}
            placeholder={`PriceSizeOption1`}
            onChange={(e) => setPriceSizeOption1(e.target.value)}
          />
          <input type="text" className="form-control"
            label="SizeOption2"
            value={sizeOption2}
            placeholder={`SizeOption2`}
            onChange={(e) => setSizeOption2(e.target.value)}
          />
          <input type="text" className="form-control"
            label="PriceSizeOption2"
            value={priceSizeOption2}
            placeholder={`PriceSizeOption2`}
            onChange={(e) => setPriceSizeOption2(e.target.value)}
          />
          <input type="text" className="form-control"
            label="ColorOption1"
            value={colorOption1}
            placeholder={`ColorOption1`}
            onChange={(e) => setColorOption1(e.target.value)}
          />
          <input type="text" className="form-control"
            label="ColorOption2"
            value={colorOption2}
            placeholder={`ColorOption2`}
            onChange={(e) => setColorOption2(e.target.value)}
          />
          <input type="text" className="form-control"
            label="ColorOption3"
            value={colorOption3}
            placeholder={`ColorOption3`}
            onChange={(e) => setColorOption3(e.target.value)}
          />
          <input type="text" className="form-control"
            label="ColorOption4"
            value={colorOption4}
            placeholder={`ColorOption4`}
            onChange={(e) => setColorOption4(e.target.value)}
          />


          <input type="text" className="form-control"
            label="FirstOption"
            value={firstOption}
            placeholder={`FirstOption`}
            onChange={(e) => setFirstOption(e.target.value)}
          />

          <input type="text" className="form-control"
            label="PriceFirstOption"
            value={priceFirstOption}
            placeholder={`PriceFirstOption`}
            onChange={(e) => setPriceFirstOption(e.target.value)}
          />
          <input type="text" className="form-control"
            label="SizefirstOption1"
            value={sizefirstOption1}
            placeholder={`SizefirstOption1`}
            onChange={(e) => setSizefirstOption1(e.target.value)}
          />
          <input type="text" className="form-control"
            label="PriceSizefirstOption1"
            value={priceSizefirstOption1}
            placeholder={`PriceSizefirstOption1`}
            onChange={(e) => setPriceSizefirstOption1(e.target.value)}
          />
          <input type="text" className="form-control"
            label="SizefirstOption2"
            value={sizefirstOption2}
            placeholder={`SizefirstOption2`}
            onChange={(e) => setSizefirstOption2(e.target.value)}
          />
          <input type="text" className="form-control"
            label="PriceSizefirstOption2"
            value={priceSizefirstOption2}
            placeholder={`PriceSizefirstOption2`}
            onChange={(e) => setPriceSizefirstOption2(e.target.value)}
          />
          <input type="text" className="form-control"
            label="Option2"
            value={option2}
            placeholder={`Option2`}
            onChange={(e) => setOption2(e.target.value)}
          />

          <input type="text" className="form-control"
            label="Option3"
            value={option3}
            placeholder={`Option3`}
            onChange={(e) => setOption3(e.target.value)}
          />

          <input type="text" className="form-control"
            label="Option4"
            value={option4}
            placeholder={`Option4`}
            onChange={(e) => setOption4(e.target.value)}
          />

          <input type="text" className="form-control"
            label="Option5"
            value={option5}
            placeholder={`Option5`}
            onChange={(e) => setOption5(e.target.value)}
          />

          <input type="text" className="form-control"
            label="Option6"
            value={option6}
            placeholder={`Option6`}
            onChange={(e) => setOption6(e.target.value)}
          />


          <input type="text" className="form-control"
            label="Option7"
            value={option7}
            placeholder={`Option7`}
            onChange={(e) => setOption7(e.target.value)}
          />


          <input type="text" className="form-control"
            label="Option8"
            value={option8}
            placeholder={`Option8`}
            onChange={(e) => setOption8(e.target.value)}
          />


          <input type="text" className="form-control"
            label="Option9"
            value={option9}
            placeholder={`Option9`}
            onChange={(e) => setOption9(e.target.value)}
          />


          <input type="text" className="form-control"
            label="Option10"
            value={option10}
            placeholder={`Option10`}
            onChange={(e) => setOption10(e.target.value)}
          />
          <input type="text" className="form-control"
            label="StandardDelivery"
            value={standardDelivery}
            placeholder={`StandardDelivery`}
            onChange={(e) => setStandardDelivery(e.target.value)}
          />

          <input type="text" className="form-control"
            label="ExpressDelivery"
            value={expressDelivery}
            placeholder={`ExpressDelivery`}
            onChange={(e) => setExpressDelivery(e.target.value)} />
          <input type="text" className="form-control"
            label=" ReadyToDispatchRange "
            value={readyToDispatchRange}
            placeholder={`ReadyToDispatchRange`}
            onChange={(e) => setReadyToDispatchRange(e.target.value)}
          />

          <select class="custom-select d-block w-100 mb-3" id="readyToDispatchDaysOrWeeks" value={readyToDispatchDaysOrWeeks}
            onChange={(e) => setReadyToDispatchDaysOrWeeks(e.target.value)} required>
            <option>Select your Processing time</option>
            <option >Business days</option>
            <option >Weeks</option>
          </select>




          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
                <>
                  <select class="custom-select d-block w-100 mb-3" id="readyToDispatchDaysOrWeeks" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option>select category</option>
                    {categories.map((category) => (

                      <>
                        <option key={category.id} value={category.name}> {category.name}</option>
                        {category.childr.map((sub) =>
                          <>
                            <option key={sub.id} value={sub.name}>  {sub.name}</option>

                            {sub.childr.map((subb) =>

                              <option key={subb.id} value={subb.name}>  {subb.name}</option>

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

          <input type="file" name="productPicture" onChange={handleProductPictures} />

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
