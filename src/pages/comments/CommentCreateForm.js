import React, { useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentCreateForm(props) {
  const { recipe, setRecipe, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        recipe,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setRecipe((prevRecipe) => ({
        results: [
          {
            ...prevRecipe.results[0],
            comments_count: prevRecipe.result[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg="8">
          <Card className="my-5 rounded-3" style={{ maxWidth: "800px" }}>
            <Form className={styles.Form} onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup>
                  <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profileImage} />
                  </Link>
                  <Form.Control
                    className={styles.Form}
                    placeholder="write a comment..."
                    as="textarea"
                    value={content}
                    onChange={handleChange}
                    rows={2}
                  />
                </InputGroup>
              </Form.Group>
              <button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
              >
                post
              </button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CommentCreateForm;
