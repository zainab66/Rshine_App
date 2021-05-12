import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addCrousel, listCrousels } from '../actions/crouselActions';
import { generatePublicUrl } from '../urlConfig';

export default function CrouselAdminScreen(props) {
  const crouselList = useSelector((state) => state.crouselList);
  const { loading, error, crousels } = crouselList;
 
  const [name, setName] = useState("");
  const [crouselPicture, setCrouselPicture] = useState([]);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCrousels());
  }, [dispatch]);


  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);

    for (let pic of crouselPicture) {
      form.append("crouselPictures", pic);
    }
    dispatch(addCrousel(form));
    setShow(false);
  }

  const handleShow = () => setShow(true);

  const handleCrouselPictures = (e) => {
    setCrouselPicture([...crouselPicture, e.target.files[0]]);
  };



  return (
    <div className="crouselAdminScreen">
      <div class="pricing  text-center">
        <button type="button" className="crouselActions" onClick={handleShow}><i class="fa fa-plus"></i><span className="ml-1">Add Crousel Pictures</span></button>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      
              <Table striped bordered hover style={{ fontSize: 12, border: 15, margin: 15 }} responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Crousel Pictures</th>
                  </tr>
                </thead>
                <tbody>
              
                  {crousels.map((crousel) => (
                     <tr key={crousel._id}>
                        <td>{crousel._id}</td>
                        <td>{crousel.name}</td>
                        <td>{crousel.crouselPictures.map(picture => <div>
                          <img className="small" src={generatePublicUrl(picture.img)} alt="" />
                        </div>)}</td>
                      </tr>
                   )
                  )}
               

                </tbody>
              </Table>
               )}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className="AddNewCrousel">Add New Crousel</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addNewCrousel">


            {crouselPicture.length > 0
              ? crouselPicture.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
              : null}
            <label for="inputProductName" class="productFormLabel">Product Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

            <input type="file" class="form-control" name="crouselPictures" onChange={handleCrouselPictures} />
          </div>
        </Modal.Body>
        <Modal.Footer>

          <Button style={{ color: 'black', background: 'white', borderRadius: 25, borderColor: 'black' }} onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
