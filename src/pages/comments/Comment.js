import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setRecipe,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  let isOwner;
  if (currentUser) {
    isOwner = currentUser.username === owner;
  }

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/comments/${id}/`);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        results: [
          {
            ...prevRecipe.results[0],
            comments_count: prevRecipe.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <div>
        <hr />
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2 ">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}> - {updated_at}</span>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p>{content}</p>
            )}
          </Media.Body>
          {isOwner && !showEditForm && (
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </div>
    </>
  );
};

export default Comment;
