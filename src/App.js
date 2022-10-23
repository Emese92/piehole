import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import { SignUpForm } from "./pages/auth/SignUpForm";
import { SignInForm } from "./pages/auth/SignInForm";
import RecipeCreateForm from "./pages/recipes/RecipeCreateForm";
import RecipePage from "./pages/recipes/RecipePage";
import Recipes from "./pages/recipes/Recipes";
import { useCurrentUser } from "./contexts/CurrentUserContext";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";


  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Recipes message="No recipes found. Adjust the search keyword." />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/recipes/create"
            render={() => <RecipeCreateForm />}
          />
          <Route exact path="/recipes/:id" render={() => <RecipePage />} />
          <Route exact path="/bookmarks" render={() => <Recipes message="No recipes found. Adjust the search keyword or bookmark a recipe."
          filter={`bookmark__owner__profile=${profile_id}&ordering=-bookmark__created_at&`} />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
