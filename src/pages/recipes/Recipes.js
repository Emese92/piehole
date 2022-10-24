import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";

import styles from "../../styles/Recipes.module.css";
import NoResults from "../../assets/no-results.gif";
import { Container, Form } from "react-bootstrap";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/Utils";

function Recipes({ message, filter = "" }) {
  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(
          `/recipes/?${filter}search=${query}`
        );
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchRecipes();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <>
      <div>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search"
          />
        </Form>
      </div>
      {/* <Card className="bg-dark text-white">
        <Card.ImgOverlay>
        </Card.ImgOverlay>
      </Card> */}

      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2">
          {hasLoaded ? (
            <>
              {recipes.results.length ? (
                <InfiniteScroll
                  children={recipes.results.map((recipe) => (
                    <Recipe
                      key={recipe.id}
                      {...recipe}
                      setRecipes={setRecipes}
                    />
                  ))}
                  dataLength={recipes.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!recipes.next}
                  next={() => fetchMoreData(recipes, setRecipes)}
                />
              ) : (
                <Container>
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Recipes;
