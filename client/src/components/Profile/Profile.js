import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileInterests from "./ProfileInterests";
import ProfileConnect from "./ProfileConnect";
import ProfileEdit from "./ProfileEdit";
import { Row, Col } from "react-bootstrap";

function Profile() {
  return (
    <div className="profile">
      <div className="imagemb-3">
        <ProfileImage />
      </div>
      <Row className="mb-5">
        <Col className="info d-flex justify-content-end align-items-center">
          <ProfileInfo />
        </Col>

        <Col className="info d-flex justify-content-start align-items-center">
          <ProfileInterests />
        </Col>
      </Row>
      <ProfileEdit />
      <ProfileConnect />
    </div>
  );
}

export default Profile;
