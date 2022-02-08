import React, { useState } from "react";
//import { useSelector } from "react-redux";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";

function ModalProfileStudent({ element }) {
  //const { user } = useSelector((store) => store.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a onClick={handleShow}>{element.student}</a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{element.student}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Info: {element.studentInfo}</ListGroupItem>
            <ListGroupItem>Country: {element.studentCountry}</ListGroupItem>
            <ListGroupItem>Language: {element.studentLanguage}</ListGroupItem>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalProfileStudent;
