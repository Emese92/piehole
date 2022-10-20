import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css"


const NavBar = () => {
  return (
    <>
      <Navbar className={styles.NavBar} bg="dark" variant="dark" expand="md" fixed="top">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-right">
              <Nav.Link><i className="fas fa-home"/><br/>Home</Nav.Link>
              <Nav.Link><i className="fas fa-sign-in-alt"></i><br/>Sign in</Nav.Link>
              <Nav.Link><i className="fas fa-user-plus"></i><br/>Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
