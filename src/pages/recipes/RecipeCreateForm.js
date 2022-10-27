import React, { useRef, useState } from "react";

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Container,
  Alert,
} from "react-bootstrap";

import styles from "../../styles/RecipeCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function RecipeCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    image: "",
    prep_time: "",
    number_of_portions: "",
    ingredients: "",
    steps: "",
  });
  const { title, image, prep_time, number_of_portions, ingredients, steps } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", imageInput.current.files[0]);
    formData.append("prep_time", prep_time);
    formData.append("number_of_portions", number_of_portions);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);

    try {
      const { data } = await axiosReq.post("/recipes/", formData);
      history.push(`/recipes/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container fluid >
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg="8">
          <Card className="my-5 rounded-3" style={{ maxWidth: "800px" }}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <Card.Title className={styles.Title}>Add a Recipe</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control
                    className={appStyles.Input}
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                {errors.title?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group>
                  <Form.Label htmlFor="image-upload">Upload Photo</Form.Label>
                  <Form.File
                    accept="image/*"
                    name="image"
                    ref={imageInput}
                    onChange={handleChangeImage}
                  ></Form.File>
                </Form.Group>
                {errors.image?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Row>
                  <Col md="6" className="mb-4">
                    <Form.Group>
                      <Form.Label>Prep Time (mins)</Form.Label>
                      <Form.Control
                        className={appStyles.Input}
                        type="number"
                        name="prep_time"
                        value={prep_time}
                        onChange={handleChange}
                      ></Form.Control>
                      <small className="form-text text-muted">
                        Please enter time in minutes
                      </small>
                    </Form.Group>
                    {errors.prep?.map((message, idx) => (
                      <Alert className="small" variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                  </Col>
                  <Col md="6" className="mb-4">
                    <Form.Group>
                      <Form.Label>Servings</Form.Label>
                      <Form.Control
                        className={appStyles.Input}
                        type="number"
                        name="number_of_portions"
                        min="0"
                        max="100"
                        value={number_of_portions}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                    {errors.serves?.map((message, idx) => (
                      <Alert className="small" variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    className={appStyles.Input}
                    as="textarea"
                    rows={3}
                    name="ingredients"
                    value={ingredients}
                    onChange={handleChange}
                  ></Form.Control>
                  <small className="form-text text-muted">
                    Please add one Ingredient per line
                  </small>
                </Form.Group>
                {errors.ingredients?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group>
                  <Form.Label>Directions</Form.Label>
                  <Form.Control
                    className={appStyles.Input}
                    as="textarea"
                    rows={6}
                    name="steps"
                    value={steps}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                {errors.steps?.map((message, idx) => (
                  <Alert className="small" variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <Row>
                  <Col md="6" className="mb-4">
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Cancel} ${btnStyles.Wide}`}
                      onClick={() => history.goBack()}
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
