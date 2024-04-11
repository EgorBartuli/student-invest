import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { getInvestorsAC } from "../../store/actions";

function MainStudent() {
  const dispatch = useDispatch();
  const investorArr = useSelector((store) => store.investor);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const res = await fetch("/getAllInvestors");
        const data = await res.json();
        dispatch(getInvestorsAC(data));
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
    };
    fetchInvestors();
  }, [dispatch]);

  return (
    <div className="mainModule">
      <Container fluid id="welcome_block" className="my-3 p-3">
        <h2 className="text-center">Investors</h2>
        <Row className="ps-3 py-2 mb-3">
          {investorArr &&
            investorArr.map((element) => (
              <Cards element={element} key={element.id} />
            ))}
        </Row>
      </Container>

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
            <Link className="nav-link d-none d-md-block" to="/profile">
              Profile
            </Link>
          </Col>
        </Row>
      </footer>
    </div>
  );
}

export default MainStudent;

