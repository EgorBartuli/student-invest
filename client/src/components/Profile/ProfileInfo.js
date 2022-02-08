import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { profileAC } from "../../store/actions";

function ProfileInfo() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      const res = await fetch("/profile");
      const data = await res.json();
      dispatch(profileAC(data));
    })();
  }, [dispatch]);

  const info = useSelector((store) => store.profile);

  return (
    <Card className="mx-3" style={{ width: '35rem' }}>
      <Container>
        <Row>
          <Col>
            <h4 className="my-2">Info</h4>
            <p>
              About: {info.info}
            </p>
            <p>
              Country: {info.country}
            </p>
            <p>
              Language: {info.language}
            </p>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default ProfileInfo;
