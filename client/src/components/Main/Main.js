import "../../App.css";
import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Button,
  Carousel,
  Form,
} from "react-bootstrap";
import inst from "./imgs/inst.jpg"; // with import
import inst2 from "./imgs/inst2.png"; // with import
import inst4 from "./imgs/inst4.jpg"; // with import

function Main() {
  return (
    <div className="mainModule">
      {/* Welcome Section */}
      <Container fluid id="welcome_block" className="my-3 p-3">
        <Row className="ps-3 py-2 bg-light bg-gradient">
          <Col
            md={7}
            lg={6}
            className="
              d-flex
              justify-content-start
              align-self-center
              flex-column
            "
          >
            <Stack>
              <p className="fs-3">
                We believe that every individual thrives in a learning-friendly
                environment where they feel safe, supported, and challenged.
              </p>
              <p className="fs-4">
                Here we accommodate and support the diverse and complex needs of
                students from all around the globe.
              </p>
              <Link
                type="button"
                className="w-50 h-auto p-3 btn btn-outline-primary"
                to="/auth/register"
              >
                Sign Up
              </Link>
            </Stack>
          </Col>
          <Col
            md={5}
            lg={6}
            className="
              d-flex
              align-items-center
              lite-description
              d-none d-md-block
            "
          >
            <Image fluid src={inst} alt="University #1" />
          </Col>
        </Row>
      </Container>

      {/* CAROUSEL */}
      <Container fluid id="carousel_block" className="my-3 p-3">
        <Row className="w-75 mx-auto my-3 d-none d-md-block">
          <Carousel>
            <Carousel.Item>
              <img src={inst} className="d-block w-100" alt="Man on a Cliff" />
              <Carousel.Caption>
                <h3>Our Goals</h3>
                <p>
                  Here we accommodate and support the diverse and complex needs
                  of students from all around the globe, since human potential
                  is the most important asset.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={inst2} className="d-block w-100" alt="Man on a Cliff" />
              <Carousel.Caption>
                <h3>Our Goals</h3>
                <p>
                  When we shape modern business models to be accessible and
                  inclusive, we reach the greatest number of professionals – and
                  ultimately benefit from what they later contribute to our
                  communities.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>

      {/* FOOTER */}
      <footer className="footer mt-3 bg-light">
        <Row className="px-5">
          <p className="fs-3">Contacts</p>
          <Col lg={6}>
            <p className="fw-light">
              Young and promising professionals require quality mentorship and
              support!
            </p>
          </Col>
          <Col lg={6}>
            <p className="fw-light">
              Quality investments in Human Capital harmonize modern business
              models and bring up brighter talents.
            </p>
          </Col>
        </Row>
        <Row className="px-5 pb-3">
          <Col md={5} lg={3}>
            <p className="fw-light">+1(123)456-78-90 | Corporate@gmail.com</p>
          </Col>
          <Col md={7} lg={9} className="d-flex justify-content-end">
            <Link className="nav-link d-none d-md-block" to="/auth/register">
              Sign Up
            </Link>
            <Link className="nav-link d-none d-md-block" to="/auth/login">
              Sign In
            </Link>
          </Col>
        </Row>
      </footer>
    </div>
  );
}

export default Main;
