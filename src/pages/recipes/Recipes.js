import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";

import NoResults from '../../assets/no_result.png'
import { Container } from "react-bootstrap";
import Asset from '../../components/Asset'

function Recipes({message, filter = ""}) {
  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/${filter}`);
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchRecipes();
  }, [filter, pathname]);

  return (
    <>
      <Card className="bg-dark text-white">
        <Card.Img src="holder.js/100px270" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <Row xs={1} md={2} lg={3} className="g-3">
        <Col>
          {hasLoaded ? (
            <>
              {recipes.results.length
                ? recipes.results.map((recipe) => (
                    <Recipe
                      key={recipe.id}
                      {...recipe}
                      setRecipes={setRecipes}
                    />
                  ))
                : <Container><Asset src={NoResults} message={message} /></Container> }
            </>
          ) : (
            <Container>
                <Asset spinner />
            </Container>
          )}
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Recipes;
