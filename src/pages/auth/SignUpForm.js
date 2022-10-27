import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";

export const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col col="12">
          <Card
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <Card.Title className={styles.Header}>Sign Up</Card.Title>
              <Card.Subtitle className="text-white-50 mb-5 mt-4 text-muted text-center">
                Please enter your username and password!
              </Card.Subtitle>

              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password1?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="password2">
                  <Form.Label className="d-none">Confirm Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password2?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} `}
                  type="submit"
                >
                  Sign Up
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert className="small mt-3" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form>
              <div>
                <p className="small text-white-50 mb-0 mt-5 text-muted">
                  Already have an account?
                  <Link className={styles.Link} to="/signin">
                    <span> Sign in</span>
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
