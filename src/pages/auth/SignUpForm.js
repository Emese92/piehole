import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";

export const SignUpForm = () => {
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

              <Form className="w-100">
                <Form.Group controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                  />
                </Form.Group>

                <Form.Group controlId="password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password1"
                  />
                </Form.Group>

                <Form.Group controlId="password2">
                  <Form.Label className="d-none">Confirm Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                  />
                </Form.Group>

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} `}
                  type="submit"
                >
                  Sign Up
                </Button>
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
