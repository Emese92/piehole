import React, { useState } from "react";

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Container,
  // Alert,
} from "react-bootstrap";

import btnStyles from "../../styles/Button.module.css";

function RecipeCreateForm() {
  const [errors, setErrors] = useState({});

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg="8">
          <Card className="my-5 rounded-3" style={{ maxWidth: "800px" }}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100"'>
              <Card.Title>Add a Recipe</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control type="text" name="title"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex" htmlFor="image-upload">
                    Photo
                  </Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                <Row>
                  <Col md="6" className="mb-4">
                    <Form.Group>
                      <Form.Label>Prep Time</Form.Label>
                      <Form.Control></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="6" className="mb-4">
                    <Form.Group>
                      <Form.Label>Servings</Form.Label>
                      <Form.Control></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Directions</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                <Row>
                <Col md="6" className="mb-4">

                <Button className={`${btnStyles.Button} ${btnStyles.Cancel} ${btnStyles.Wide}`} onClick={() => {}}>
                  cancel
                </Button>
                </Col>
                <Col md="6" className="mb-4">
                <Button className={`${btnStyles.Button} ${btnStyles.Gray} ${btnStyles.Wide}`} type="submit">
                  create
                </Button>
                </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeCreateForm;
