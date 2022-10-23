import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const LoggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/bookmarks"
      >
        <i className="fas fa-bookmark"></i>
        <br />
        Saved
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/recipes/create"
      >
        <i className="fas fa-plus-square"></i>
        <br />
        Add Recipe
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={30} />
        <br />
        Profile
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>
        <br />
        Sign out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>
        <br />
        Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>
        <br />
        Sign up
      </NavLink>
    </>
  );

  return (
    <>
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        bg="dark"
        variant="dark"
        expand="md"
        fixed="top"
      >
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45px" />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-center">
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <i className="fas fa-home" />
                <br />
                Home
              </NavLink>
              {currentUser ? LoggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
