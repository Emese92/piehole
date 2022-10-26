import React from "react";
import {
  Navbar,
  Container,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

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
      <OverlayTrigger placement="bottom" overlay={<Tooltip className={styles.Tooltip}>Bookmarks</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/bookmarks"
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
        >
          <i className="fas fa-plus-square"></i>
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Profile</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to={`/profiles/${currentUser?.profile_id}`}
        >
          <Avatar src={currentUser?.profile_image} height={30} />
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign out</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/"
          onClick={handleSignOut}
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
        >
          <i className="fas fa-sign-in-alt"></i>
        </NavLink>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign up</Tooltip>}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/signup"
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
                  <br />
                  {/* Home */}
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
