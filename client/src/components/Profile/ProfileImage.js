import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Upload } from 'react-bootstrap-icons';
import { thunkUploadHandler } from "../../store/actions";
import _default from "react-bootstrap/esm/Accordion";

function ProfileImage() {
  const { user } = useSelector((store) => store.user);
  const { photo } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   dispatch(thunkUploadHandler(event));
  // };

  React.useEffect(() => {}, [photo]);

  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image className="w-50" src={photo} rounded />
        </Col>
        {/* <form onSubmit={submitHandler}>
          <input name="file" type="file" id="input_file" hidden />
          <label for="input_file">
            <Upload color="blue" size={43}/>
          </label>
          <Button variant="outline-primary" type="submit">
            Uploud
          </Button>
        </form> */}
        <h3 className="text-center">{user}</h3>
      </Row>
    </Container>
  );
}

export default ProfileImage;
