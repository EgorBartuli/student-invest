import React, { useState } from "react";
//import { useSelector } from "react-redux";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";

function ModalProfileInvestor({ element }) {
  //const { user } = useSelector((store) => store.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(element);

  return (
    <>
      <a onClick={handleShow}>{element.investor}</a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{element.investor}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Info: {element.investorInfo}</ListGroupItem>
            <ListGroupItem>Country: {element.investorCountry}</ListGroupItem>
            <ListGroupItem>Language: {element.investorLanguage}</ListGroupItem>
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

export default ModalProfileInvestor;
