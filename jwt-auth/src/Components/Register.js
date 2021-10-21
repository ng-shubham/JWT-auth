import React, { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Register = ({ setLogOutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", { email, password })
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
      <Header />
      <Container
        style={{ minHeight: "91vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Card style={{ maxWidth: "25rem" }}>
          <Card.Img
            variant="top"
            src="https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_960_720.jpg"
          />
          <Card.Body>
            <Card.Title className="text-primary">Registration </Card.Title>
            <Form autoComplete="off" onSubmit={registerHandler}>
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
                Register
              </Button>
              {error && (
                <Alert variant="danger" className="mt-2 p-2 px-3">
                  {error}
                </Alert>
              )}
              <Form.Text muted className="d-flex justify-content-center">
                Already have an account? then please&nbsp;
                <Link to="/login">login</Link>.
              </Form.Text>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Register;
