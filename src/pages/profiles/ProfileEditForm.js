import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import avatarStyles from "../../styles/Avatar.module.css";
import { Container } from "react-bootstrap";

// This code is based on the Code Institute's walkthrough project and modified for my project

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    image: "",
  });
  const { name, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, image } = data;
          setProfileData({ name, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
        username,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const textFields = (
    <>
      <Form.Label>Change username</Form.Label>
      <Form.Control
        className={`${appStyles.Input} mb-3`}
        placeholder="username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      {errors?.username?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Button className={btnStyles.Edit} onClick={() => history.goBack()}>
        cancel
      </Button>

      <Button className={btnStyles.Edit} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 mx-auto text-center">
          <Container
            className={appStyles.Content}
            style={{ maxWidth: "600px" }}
          >
            <Form.Group>
              {image && (
                <figure>
                  <Image
                    src={image}
                    className={avatarStyles.Avatar}
                    style={{ width: "150px", height: "150px" }}
                  />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} mb-5 btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                className="d-none"
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
              <br />
              {textFields}
            </Form.Group>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
