import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
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

  console.log(popularRecipes.results[0].id)

  return (
    <Container className={appStyles.Content}>
      <Recipe key={popularRecipes.results[0].id} {...popularRecipes.results[0]} setRecipes={setPopularRecipes} />
    </Container>
  );
};

export default PopularRecipes;
