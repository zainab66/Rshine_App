import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addProduct, listProducts,deleteProduct ,deleteReview} from '../actions/productActions';
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
  const [size1, setSize1] = useState("");
  const [priceSize1, setPriceSize1] = useState("");
  const [size2, setSize2] = useState("");
  const [priceSize2, setPriceSize2] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");
  const [option1, setoption1] = useState("");
  const [priceOption1, setpriceOption1] = useState("");
  const [size1_Option1, setsize1_Option1] = useState("");
  const [priceSize1_Option1, setpriceSize1_Option1] = useState("");
  const [size2_Option1, setsize2_Option1] = useState("");
  const [priceSize2_Option1, setpriceSize2_Option1] = useState("");
  const [option2, setOption2] = useState("");
  const [priceOption2, setpriceOption2] = useState("");
  const [size1_Option2, setsize1_Option2] = useState("");
  const [priceSize1_Option2, setpriceSize1_Option2] = useState("");
  const [size2_Option2, setsize2_Option2] = useState("");
  const [priceSize2_Option2, setpriceSize2_Option2] = useState("");
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
  const reload=()=>window.location.reload();

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
    form.append("size1", size1);
    form.append("priceSize1", priceSize1);
    form.append("size2", size2);
    form.append("priceSize2", priceSize2);
    form.append("color1", color1);
    form.append("color2", color2);
    form.append("color3", color3);
    form.append("color4", color4);
    form.append("option1", option1);
    form.append("priceOption1", priceOption1);
    form.append("size1_Option1", size1_Option1);
    form.append("priceSize1_Option1", priceSize1_Option1);
    form.append("size2_Option1", size2_Option1);
    form.append("priceSize2_Option1", priceSize2_Option1);
    form.append("option2", option2);
    form.append("priceOption2", priceOption2);
    form.append("size1_Option2", size1_Option2);
    form.append("priceSize1_Option2", priceSize1_Option2);
    form.append("size2_Option2", size2_Option2);
    form.append("priceSize2_Option2", priceSize2_Option2);
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
    reload();

  }

  const handleShow = () => setShow(true);

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
    reload();
  };
 
  const deletereview = (product,review) => {
    console.log(product._id,review._id)
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteReview(review._id,product._id));
    }
    reload();
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
                  <th>Size1</th>
                  <th>PriceSize1</th>
                  <th>Size2</th>
                  <th>PriceSize2</th>
                  <th>Color1</th>
                  <th>Color2</th>
                  <th>Color3</th>
                  <th>Color4</th>
                  <th>option1</th>
                  <th>priceOption1</th>
                  <th>size1_Option1</th>
                  <th>priceSize1_Option1</th>
                  <th>size2_Option1</th>
                  <th>priceSize2_Option1</th>
                  <th>Option2</th>
                  <th>priceOption2</th>
                  <th>size1_Option2</th>
                  <th>priceSize1_Option2</th>
                  <th>size2_Option2</th>
                  <th>priceSize2_Option2</th>
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
                    <td>{product.size1}</td>
                    <td>{product.priceSize1}</td>
                    <td>{product.size2}</td>
                    <td>{product.priceSize2}</td>
                    <td>{product.color1}</td>
                    <td>{product.color2}</td>
                    <td>{product.color3}</td>
                    <td>{product.color4}</td>
                    <td>{product.option1}</td>
                    <td>{product.priceOption1}</td>
                    <td>{product.size1_Option1}</td>
                    <td>{product.priceSize1_Option1}</td>
                    <td>{product.size2_Option1}</td>
                    <td>{product.priceSize2_Option1}</td>
                    <td>{product.option2}</td>
                    <td>{product.priceOption2}</td>
                    <td>{product.size1_Option2}</td>
                    <td>{product.priceSize1_Option2}</td>
                    <td>{product.size2_Option2}</td>
                    <td>{product.priceSize2_Option2}</td>
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
                      {/* <button
                        type="button"
                        className="small"
                        onClick={() =>
                          props.history.push(`/product/${product._id}/edit`)
                        }
                      >
                        Edit
                  </button> */}
                      <button
                        type="button"
                        className="btnEditUser"
                        onClick={() => deleteHandler(product)}>
                        Delete
                  </button>
                    </td>
                    <td>{product.reviews.map(review => <div className="productImgContainer">
                  {review.comment}
                    

                    <button
                        type="button"
                        className="btnEditUser"
                        onClick={() => deletereview(product,review)}>
                        Delete review
                  </button></div>)}</td>
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
        
          <label for="inputSize1" class="productFormLabel">Size1</label>
          <input type="text" className="form-control" value={size1} onChange={(e) => setSize1(e.target.value)}/>
          
          <label for="inputPriceSize1" class="productFormLabel">PriceSize1</label>
          <input type="text" className="form-control" value={priceSize1} onChange={(e) => setPriceSize1(e.target.value)}/>
         
          <label for="inputSize2" class="productFormLabel">Size2</label>
          <input type="text" className="form-control" value={size2} onChange={(e) => setSize2(e.target.value)}/>
        
          <label for="inputPriceSizeOption2" class="productFormLabel">PriceSize2</label>
          <input type="text" className="form-control" value={priceSize2} onChange={(e) => setPriceSize2(e.target.value)}/>
         
          <label for="inputColor1" class="productFormLabel">Color1</label>
          <input type="text" className="form-control" value={color1} onChange={(e) => setColor1(e.target.value)}/>
          
          <label for="inputColor2" class="productFormLabel">Color2</label>
          <input type="text" className="form-control" value={color2} onChange={(e) => setColor2(e.target.value)}/>
         
          <label for="inputColor3" class="productFormLabel">Color3</label>
          <input type="text" className="form-control" value={color3} onChange={(e) => setColor3(e.target.value)}/>
        
          <label for="inputColor4" class="productFormLabel">Color4</label>
          <input type="text" className="form-control" value={color4} onChange={(e) => setColor4(e.target.value)}/>

          <label for="inputoption1" class="productFormLabel">option1</label>
          <input type="text" className="form-control" value={option1} onChange={(e) => setoption1(e.target.value)}/>
         
          <label for="inputpriceOption1" class="productFormLabel">priceOption1</label>
          <input type="text" className="form-control" value={priceOption1} onChange={(e) => setpriceOption1(e.target.value)}/>
          
          <label for="inputsize1_Option1" class="productFormLabel">size1_Option1</label>
          <input type="text" className="form-control" value={size1_Option1} onChange={(e) => setsize1_Option1(e.target.value)}/>
          
          <label for="inputpriceSize1_Option1" class="productFormLabel">priceSize1_Option1</label>
          <input type="text" className="form-control" value={priceSize1_Option1} onChange={(e) => setpriceSize1_Option1(e.target.value)}/>
         
          <label for="inputsize2_Option1" class="productFormLabel">size2_Option1</label>
          <input type="text" className="form-control" value={size2_Option1} onChange={(e) => setsize2_Option1(e.target.value)}/>
        
          <label for="inputpriceSize2_Option1" class="productFormLabel"> priceSize2_Option1</label>
          <input type="text" className="form-control" value={priceSize2_Option1} onChange={(e) => setpriceSize2_Option1(e.target.value)}/>
          
          <label for="inputOption2" class="productFormLabel">Option2</label>
          <input type="text" className="form-control" value={option2} onChange={(e) => setOption2(e.target.value)}/>
          
          <label for="inputpriceOption2" class="productFormLabel">priceOption2</label>
          <input type="text" className="form-control" value={priceOption2} onChange={(e) => setpriceOption2(e.target.value)}/>

          <label for="inputsize1_Option2" class="productFormLabel">size1_Option2</label>
          <input type="text" className="form-control" value={size1_Option2} onChange={(e) => setsize1_Option2(e.target.value)}/>
          
          <label for="inputpriceSize1_Option2" class="productFormLabel">priceSize1_Option2</label>
          <input type="text" className="form-control" value={priceSize1_Option2} onChange={(e) => setpriceSize1_Option2(e.target.value)}/>
         
          <label for="inputsize2_Option2" class="productFormLabel">size2_Option2</label>
          <input type="text" className="form-control" value={size2_Option2} onChange={(e) => setsize2_Option2(e.target.value)}/>
        
          <label for="inputpriceSize2_Option2" class="productFormLabel"> priceSize2_Option2</label>
          <input type="text" className="form-control" value={priceSize2_Option2} onChange={(e) => setpriceSize2_Option2(e.target.value)}/>
          
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
