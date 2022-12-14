import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Recipe.module.css";

const Recipe = (props) => {
  const {
    id,
    owner,
    title,
    prep_time,
    image,
    number_of_portions,
    ingredients,
    steps,
    profile_id,
    profile_image,
    like_id,
    bookmark_id,
    likes_count,
    comments_count,
    recipePage,
    setRecipes,
  } = props;

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/recipes/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/recipes/${id}/`);
      history.push('/');
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { recipe: id });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? {
                ...recipe,
                likes_count: recipe.likes_count + 1,
                like_id: data.id,
              }
            : recipe;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? { ...recipe, likes_count: recipe.likes_count - 1, like_id: null }
            : recipe;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { recipe: id });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? {
                ...recipe,
                bookmark_id: data.id,
              }
            : recipe;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id ? { ...recipe, bookmark_id: null } : recipe;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (

      <Card className="rounded-3 mx-auto" style={{ maxWidth: "800px" }}>
        <Card.Body className="d-flex flex-column ">
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>
                {isOwner ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't save your own post!</Tooltip>}
                  >
                    <i className="far fa-bookmark" />
                  </OverlayTrigger>
                ) : bookmark_id ? (
                  <span onClick={handleRemoveBookmark}>
                    <i className={`fas fa-bookmark ${styles.Bookmark}`} />
                  </span>
                ) : currentUser ? (
                  <span onClick={handleBookmark}>
                    <i
                      className={`far fa-bookmark ${styles.BookmarkOutline}`}
                    />
                  </span>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to save posts!</Tooltip>}
                  >
                    <i className="far fa-bookmark" />
                  </OverlayTrigger>
                )}
                {isOwner ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                  >
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                ) : like_id ? (
                  <span onClick={handleUnike}>
                    <i className={`fas fa-heart ${styles.Heart}`} />
                  </span>
                ) : currentUser ? (
                  <span onClick={handleLike}>
                    <i className={`far fa-heart ${styles.HeartOutline}`} />
                  </span>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to like posts!</Tooltip>}
                  >
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                )}
                {likes_count}
                <Link to={`/recipes/${id}`}>
                  <i className="far fa-comment" />
                </Link>
                {comments_count}
              </span>
              {isOwner && recipePage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/recipes/${id}`}>
          <Card.Img src={image} alt={title} className={styles.Image} />
        </Link>
        <Card.Body>
          {title &&  <Card.Title className={styles.Title}>{title}</Card.Title>}
          <Row>
            <Col md="6" className="mb-4 align-items-center d-flex flex-column">
              {recipePage && prep_time && (
                <Card.Text>
                  <i className={`far fa-clock ${styles.Icon}`}></i>Time to make:{" "}
                  <span className={styles.Bold}>{prep_time} min </span>
                </Card.Text>
              )}
            </Col>
            <Col md="6" className="mb-4 align-items-center d-flex flex-column">
              {recipePage && number_of_portions && (
                <Card.Text>
                  <i className={`fas fa-users ${styles.Icon}`}></i>Servings:{" "}
                  <span className={styles.Bold}>{number_of_portions} </span>
                </Card.Text>
              )}
            </Col>
          </Row>
          {recipePage && ingredients && (
            <Card.Text className={styles.NewLine}>
              <p className={styles.Head}>Ingredients:</p>
              {ingredients}
            </Card.Text>
          )}
          {recipePage && steps && (
            <Card.Text className={styles.NewLine}>
              <p className={styles.Head}>Steps:</p>
              {steps}
            </Card.Text>
          )}
        </Card.Body>
      </Card>

  );
};

export default Recipe;
