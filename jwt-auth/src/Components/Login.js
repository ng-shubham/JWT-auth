import React, { useState } from "react";
import { Card, Container, Button, Form, Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = ({ setLogOutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", { email, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setLogOutUser(false);
        history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link className="my-2" to="/">
            <Navbar.Brand>JWT-Auth</Navbar.Brand>
          </Link>
          <Nav className="ml-auto">
            <Link to="/register">Register</Link>
          </Nav>
        </Container>
      </Navbar>
      <Container
        style={{ minHeight: "91vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Card style={{ maxWidth: "25rem" }}>
          <Card.Img
            variant="top"
            src="https://cdn.pixabay.com/photo/2019/01/17/19/11/registration-3938434_960_720.jpg"
            className="login-img"
          />
          <Card.Body>
            <Card.Title className="text-primary">LogIn </Card.Title>
            <Form autoComplete="off" onSubmit={loginHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="w-100" variant="primary" type="submit">
                LogIn
              </Button>
              {error && (
                <Alert variant="danger" className="mt-2 p-2 px-3">
                  {error}
                </Alert>
              )}
            </Form>
            <Form.Text muted className="d-flex justify-content-center">
              Don't have an account then please do&nbsp;
              <Link to="/register">register</Link>&nbsp;yourself.
            </Form.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
