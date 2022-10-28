import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signin = screen.getByTestId("sign-in");
  expect(signin).toBeInTheDocument();
});

test("renders link to the user profile for logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );
  const profileAvatar = await screen.findByTestId("profile");
  const bookmarks = await screen.findByTestId("bookmarks");
  const addNewRecipe = await screen.findByTestId("add-new-recipe");
  expect(profileAvatar).toBeInTheDocument();
  expect(bookmarks).toBeInTheDocument();
  expect(addNewRecipe).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );
  const signout = await screen.findByTestId("sign-out");
  fireEvent.click(signout);

  const signin = await screen.findByTestId("sign-in");
  const signup = await screen.findByTestId("sign-up");

  expect(signin).toBeInTheDocument();
  expect(signup).toBeInTheDocument();
});
