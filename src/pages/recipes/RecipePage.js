import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../..//utils/Utils.js";
import Recipe from "./Recipe";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recipe }, { data: comments }] = await Promise.all([
          axiosReq.get(`/recipes/${id}`),
          axiosReq.get(`/comments/?recipe=${id}`),
        ]);
        setRecipe({ results: [recipe] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="mw-100">
      <Col className="p-0 p-lg-2">
        <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage />
        <Container className="rounded-3 mx-auto" style={{ maxWidth: "800px" }}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              recipe={id}
              setRecipes={setRecipe}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setRecipe={setRecipe}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : (
            <div className="text-center mb-4">No comments yet</div>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default RecipePage;
