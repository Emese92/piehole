import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar/>
    </Router>
  );

  //   screen.debug();
  const signInLink = screen.getByRole("link", { name: "signin" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar/>
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByTestId("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders Sig in and Sign up buttons again on  log out", async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar/>
        </CurrentUserProvider>
      </Router>
    );
        const signOutLink= await screen.findByRole('Link', {name: 'signout'})
        fireEvent.click(signOutLink)

        const signInLink = screen.getByRole("link", { name: "signin" });
        const signUpLink = screen.getByRole("link", { name: "signup" });

        expect(signInLink).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
        screen.debug();
  });
