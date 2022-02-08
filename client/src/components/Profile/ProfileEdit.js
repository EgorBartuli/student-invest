import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { Upload } from 'react-bootstrap-icons';
import { thunkProfileAC } from "../../store/actions";
import { thunkUploadHandler } from '../../store/actions';

function ProfileEdit() {
  const formEl = useRef();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(thunkUploadHandler(event));
  };

  return (
    <>
      <Button
        className="ms-3 mt-3"
        variant="outline-primary"
        onClick={handleShow}
      >
        Edit
      </Button>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <form onSubmit={submitHandler}>
          <input name="file" type="file" id="input_file" hidden />
          <label for="input_file">
            <Upload color="blue" size={43}/>
          </label>
          <Button variant="outline-primary" type="submit">
            Uploud
          </Button>
        </form>
          <Form
            ref={formEl}
            className="w-75 mx-auto my-3"
            onSubmit={(e) => dispatch(thunkProfileAC(e, formEl))}
          >
            <h3>Profile Edit</h3>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label>Аватар</Form.Label><br/>
              <input type='file' name='store_img'/>
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="infoProfile">
              <Form.Label>Info</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Tell us about yourself!"
                style={{ height: "100px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="interestsProfile">
              <Form.Label>Interests</Form.Label>
              <Form.Control required type="text" placeholder="Your interests" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="countryProfile">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Where are You from?"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="languageProfile">
              <Form.Label>Language</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Spoken languages"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" type="submit" onClick={handleClose}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileEdit;
