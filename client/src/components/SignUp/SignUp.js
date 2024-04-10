import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkSignUpAC } from "../../store/actions";

function SignUp() {
  const formEl = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  navigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkSignUpAC(e, formEl));
  };

  return (
    <Form ref={formEl} className="w-50 mx-auto my-3" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <Form.Group className="mb-3" controlId="signUpEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signUpName">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter your name" />
      </Form.Group>

      <Form.Select required className="mb-3" name="signUpStatus">
        <option>Status</option>
        <option value="Investor">Investor</option>
        <option value="Student">Student</option>
        <option value="University">University</option>
      </Form.Select>

      <Form.Group className="mb-3" controlId="signUpPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;
