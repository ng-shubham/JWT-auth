import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ logOutUser, setLogOutUser }) => {
  const [login, setLogin] = useState("");

  useEffect(() => {
    localStorageState();
  }, [logOutUser]);

  const logout = () => {
    localStorage.removeItem("login");
    setLogOutUser(true);
  };
  const localStorageState = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch (error) {
        setLogin("");
      }
    }
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link className="my-2" to="/">
            <Navbar.Brand>JWT-Auth</Navbar.Brand>
          </Link>
          <Nav className="ml-auto">
            {!logOutUser && login && login.userLogin ? (
              <Nav.Link onClick={logout}>LogOut</Nav.Link>
            ) : (
              <Link to="/login">LogIn</Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
