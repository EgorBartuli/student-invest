import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProfileInterests() {
  const info = useSelector((store) => store.profile);
  return (
    <Card className="mx-3" style={{ width: "20rem" }}>
      <Container>
        <Row>
          <Col>
            <h4 className="my-2">Interests</h4>
            <p>{info.interests}</p>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default ProfileInterests;
