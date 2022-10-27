import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import recipeStyles from "../../styles/Recipes.module.css";
import Recipe from "./Recipe";

const PopularRecipes = () => {
  const [popularRecipes, setPopularRecipes] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/?ordering=-likes_count`);
        setPopularRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, []);

  return (
    <Container className={`${recipeStyles.Popular} rounded-3`}>
      <p className={recipeStyles.PopularHeader}>Most liked recipe</p>
      <Recipe
        key={popularRecipes.results[0]}
        {...popularRecipes.results[0]}
        setRecipes={setPopularRecipes}
      />
    </Container>
  );
};

export default PopularRecipes;
