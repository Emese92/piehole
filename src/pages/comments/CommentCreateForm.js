import React, { useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";

import btnStyles from "../../styles/Button.module.css"
import styles from "../../styles/CommentCreateEditForm.module.css"

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
      setContent("");
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setRecipe((prevRecipes) => (
        {
          results: [
            {
              ...prevRecipes.results[0],
              comments_count: prevRecipes.result[0].comments_count + 1,
            },
          ],
        }
      ));

      
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Col >
          <Card className="my-5 rounded-3" style={{ maxWidth: "800px" }}>
            <Form onSubmit={handleSubmit}>
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
                    rows={1}
                  />
                </InputGroup>
              </Form.Group>
              <button
                className={`${btnStyles.Button} btn d-block m-auto`}
                disabled={!content.trim()}
                type="submit"
              >
                Post
              </button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CommentCreateForm;
