import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
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
    <div className="productAdminScreen">
       <div class="pricing  text-center">
      <button type="button" className="productActions" onClick={handleShow}><i class="fas fa-plus"></i><span className="ml-1">Add Product</span></button>
    </div>
      {loadingList ? (
        <LoadingBox></LoadingBox>
      ) : errorList ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <Table striped bordered hover style={{ fontSize: 12, border: 15, margin: 15 }} responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>DiscountPrice(%)</th>
                  <th>Category</th>
                  <th>CountInStock</th>
                  <th>Description</th>
                  <th>AddYourPersonalisation</th>
                  <th>MadeBy</th>
                  <th>Material</th>
                  <th>SizeOption1</th>
                  <th>PriceSizeOption1</th>
                  <th>SizeOption2</th>
                  <th>PriceSizeOption2</th>
                  <th>ColorOption1</th>
                  <th>ColorOption2</th>
                  <th>ColorOption3</th>
                  <th>ColorOption4</th>
                  <th>FirstOption</th>
                  <th>PriceFirstOption</th>
                  <th>SizefirstOption1</th>
                  <th>PriceSizefirstOption1</th>
                  <th>SizefirstOption2</th>
                  <th>PriceSizefirstOption2</th>
                  <th>Option2</th>
                  <th>Option3</th>
                  <th>Option4</th>
                  <th>Option5</th>
                  <th>Option6</th>
                  <th>Option7</th>
                  <th>Option8</th>
                  <th>Option9</th>
                  <th>Option10</th>
                  <th>StandardDelivery</th>
                  <th>ExpressDelivery</th>
                  <th>ReadyToDispatchRange</th>
                  <th>ReadyToDispatchDaysOrWeeks</th>
                  <th>Product Pictures</th>
                  <th>Actions</th>
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
                      <img className="small" src={picture.img} alt="" />
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
          <Modal.Title><h2 className="AddNewCategory">Add New Product</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addNewProduct">

          <label for="inputProductName" class="productFormLabel">Product Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>

          <label for="inputCountInStock" class="productFormLabel">CountInStock</label>
          <input className="form-control" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
          
          <label for="inputPrice" class="productFormLabel">Price</label>
          <input className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}/>
         
          <label for="inputDiscountPrice" class="productFormLabel">DiscountPrice</label>
          <input className="form-control" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)}/>
         
          <label for="inputDescription" class="productFormLabel">Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
          
          <label for="inputAddYourPersonalisation" class="productFormLabel">AddYourPersonalisation</label>
          <input type="text" className="form-control" value={addYourPersonalisation} onChange={(e) => setAddYourPersonalisation(e.target.value)}/>
        
          <label for="inputMadeBy" class="productFormLabel">MadeBy</label>
          <input type="text" className="form-control" value={madeBy} onChange={(e) => setMadeBy(e.target.value)}/>
          
          <label for="inputMaterial" class="productFormLabel">Material</label>
          <input type="text" className="form-control" value={material} onChange={(e) => setMaterial(e.target.value)}/>
        
          <label for="inputSizeOption1" class="productFormLabel">SizeOption1</label>
          <input type="text" className="form-control" value={sizeOption1} onChange={(e) => setSizeOption1(e.target.value)}/>
          
          <label for="inputPriceSizeOption1" class="productFormLabel">PriceSizeOption1</label>
          <input type="text" className="form-control" value={priceSizeOption1} onChange={(e) => setPriceSizeOption1(e.target.value)}/>
         
          <label for="inputSizeOption2" class="productFormLabel">SizeOption2</label>
          <input type="text" className="form-control" value={sizeOption2} onChange={(e) => setSizeOption2(e.target.value)}/>
        
          <label for="inputPriceSizeOption2" class="productFormLabel">PriceSizeOption2</label>
          <input type="text" className="form-control" value={priceSizeOption2} onChange={(e) => setPriceSizeOption2(e.target.value)}/>
         
          <label for="inputColorOption1" class="productFormLabel">ColorOption1</label>
          <input type="text" className="form-control" value={colorOption1} onChange={(e) => setColorOption1(e.target.value)}/>
          
          <label for="inputColorOption2" class="productFormLabel">ColorOption2</label>
          <input type="text" className="form-control" value={colorOption2} onChange={(e) => setColorOption2(e.target.value)}/>
         
          <label for="inputColorOption3" class="productFormLabel">ColorOption3</label>
          <input type="text" className="form-control" value={colorOption3} onChange={(e) => setColorOption3(e.target.value)}/>
        
          <label for="inputColorOption4" class="productFormLabel">ColorOption4</label>
          <input type="text" className="form-control" value={colorOption4} onChange={(e) => setColorOption4(e.target.value)}/>

          <label for="inputFirstOption" class="productFormLabel">FirstOption</label>
          <input type="text" className="form-control" value={firstOption} onChange={(e) => setFirstOption(e.target.value)}/>
         
          <label for="inputPriceFirstOption" class="productFormLabel">PriceFirstOption</label>
          <input type="text" className="form-control" value={priceFirstOption} onChange={(e) => setPriceFirstOption(e.target.value)}/>
          
          <label for="inputSizefirstOption1" class="productFormLabel">SizefirstOption1</label>
          <input type="text" className="form-control" value={sizefirstOption1} onChange={(e) => setSizefirstOption1(e.target.value)}/>
          
          <label for="inputPriceSizefirstOption1" class="productFormLabel">PriceSizefirstOption1</label>
          <input type="text" className="form-control" value={priceSizefirstOption1} onChange={(e) => setPriceSizefirstOption1(e.target.value)}/>
         
          <label for="inputSizefirstOption2" class="productFormLabel">SizefirstOption2</label>
          <input type="text" className="form-control" value={sizefirstOption2} onChange={(e) => setSizefirstOption2(e.target.value)}/>
        
          <label for="inputPriceSizefirstOption2" class="productFormLabel">PriceSizefirstOption2</label>
          <input type="text" className="form-control" value={priceSizefirstOption2} onChange={(e) => setPriceSizefirstOption2(e.target.value)}/>
          
          <label for="inputOption2" class="productFormLabel">Option2</label>
          <input type="text" className="form-control" value={option2} onChange={(e) => setOption2(e.target.value)}/>
          
          <label for="inputOption3" class="productFormLabel">Option3</label>
          <input type="text" className="form-control" value={option3} onChange={(e) => setOption3(e.target.value)}/>
          
          <label for="inputOption4" class="productFormLabel">Option4</label>
          <input type="text" className="form-control" value={option4} onChange={(e) => setOption4(e.target.value)}/>
       
          <label for="inputOption5" class="productFormLabel">Option5</label>
          <input type="text" className="form-control" value={option5} onChange={(e) => setOption5(e.target.value)}/>

          <label for="inputOption6" class="productFormLabel">Option6</label>
          <input type="text" className="form-control" value={option6} onChange={(e) => setOption6(e.target.value)}/>

          <label for="inputOption7" class="productFormLabel">Option7</label>
          <input type="text" className="form-control" value={option7} onChange={(e) => setOption7(e.target.value)}/>

          <label for="inputOption8" class="productFormLabel">Option8</label>
          <input type="text" className="form-control" value={option8} onChange={(e) => setOption8(e.target.value)}/>

          <label for="inputOption9" class="productFormLabel">Option9</label>
          <input type="text" className="form-control" value={option9} onChange={(e) => setOption9(e.target.value)}/>

          <label for="inputOption10" class="productFormLabel">Option10</label>
          <input type="text" className="form-control" value={option10} onChange={(e) => setOption10(e.target.value)}/>
         
          <label for="inputStandardDelivery" class="productFormLabel">StandardDelivery</label>
          <input type="text" className="form-control" value={standardDelivery} onChange={(e) => setStandardDelivery(e.target.value)}/>

          <label for="inputExpressDelivery" class="productFormLabel">ExpressDelivery</label>
          <input type="text" className="form-control" value={expressDelivery} onChange={(e) => setExpressDelivery(e.target.value)} />
          
          <label for="inputReadyToDispatchRange" class="productFormLabel">ReadyToDispatchRange</label>
          <input type="text" className="form-control" value={readyToDispatchRange} onChange={(e) => setReadyToDispatchRange(e.target.value)}/>
        
          <label for="option" class="categoryFormLabel">ReadyToDispatchDaysOrWeeks</label>
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
                  <label for="option" class="categoryFormLabel">Categories</label>
                  <select class="custom-select d-block w-100 mb-3" id="readyToDispatchDaysOrWeeks" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option>Select category</option>
                    {categories.map((category) => (

                      <>
                        {/* <option key={category.id} value={category.name}> {category.name}</option> */}
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

          <input type="file" class="form-control" name="productPicture" onChange={handleProductPictures} />
          </div>
        </Modal.Body>
        <Modal.Footer>

          <Button style={{ color: 'black', background: '#00bbcc', borderRadius: 25, borderColor: '#ffd480' }} onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
