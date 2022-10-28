import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/Utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const LoggedInIcons = (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip className={styles.Tooltip}>Bookmarks</Tooltip>}
      >
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/bookmarks"
           data-testid="bookmarks"
        >
          <i className="fas fa-bookmark"></i>
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Add a new recipe</Tooltip>}
      >
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/recipes/create"
          data-testid="add-new-recipe"
        >
          <i className="fas fa-plus-square"></i>
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Profile</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to={`/profiles/${currentUser?.profile_id}`}
          data-testid="profile"
        >
          <Avatar src={currentUser?.profile_image} height={35} />
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign out</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/"
          onClick={handleSignOut}
          data-testid="sign-out"
        >
          <i className="fas fa-sign-out-alt"></i>
        </NavLink>
      </OverlayTrigger>
    </>
  );

  const LoggedOutIcons = (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign in</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/signin"
          data-testid="sign-in"
        >
          <i className="fas fa-sign-in-alt"></i>
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign up</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/signup"
          data-testid="sign-up"
        >
          <i className="fas fa-user-plus"></i>
        </NavLink>
      </OverlayTrigger>
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
              <h1>Piehole</h1>
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Home</Tooltip>}
              >
                <NavLink
                  exact
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to="/"
                >
                  <i className="fas fa-home" />
                </NavLink>
              </OverlayTrigger>
              {currentUser ? LoggedInIcons : LoggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
