import React, { useEffect, useState } from "react";

import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import Recipe from "./Recipe";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recipe }] = await Promise.all([
          axiosReq.get(`/recipes/${id}`),
        ]);
        setRecipe({results: [recipe]})
        console.log(recipe)
      } catch (err) {
        console.log(err);
      }
    };
    handleMount()
  }, [id]);

  return (
    <Row className="mw-100">
      <Col className="p-0 p-lg-2">
        <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage/>
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
    </Row>
  );
}

export default RecipePage;
