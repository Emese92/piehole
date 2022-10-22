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

import styles from "../../styles/RecipeCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function RecipeCreateForm() {
  const [errors, setErrors] = useState({});

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg="8">
          <Card className="my-5 rounded-3" style={{ maxWidth: "800px" }}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100"'>
              <Card.Title className={styles.Title}>Add a Recipe</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control
                    className={appStyles.Input}
                    type="text"
                    name="title"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="image-upload">Upload Photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="image"
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col md="6" className="mb-4">
                    <Form.Group>
                      <Form.Label>Prep Time (mins)</Form.Label>
                      <Form.Control
                        className={appStyles.Input}
                        type="number"
                        name="prep-time"
                      ></Form.Control>
                      <small class="form-text text-muted">
                        Please enter time in minutes
                      </small>
                    </Form.Group>
                  </Col>
                  <Col md="6" className="mb-4">
                    <Form.Group>
                      <Form.Label>Servings</Form.Label>
                      <Form.Control
                        className={appStyles.Input}
                        type="number"
                        name="serves"
                        min="0"
                        max="100"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    className={appStyles.Input}
                    type="text"
                    name="ingredients"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Directions</Form.Label>
                  <Form.Control
                    className={appStyles.Input}
                    type="textarea"
                    rows={5}
                    name="steps"
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col md="6" className="mb-4">
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Cancel} ${btnStyles.Wide}`}
                      onClick={() => {}}
                    >
                      cancel
                    </Button>
                  </Col>
                  <Col md="6" className="mb-4">
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Gray} ${btnStyles.Wide}`}
                      type="submit"
                    >
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
