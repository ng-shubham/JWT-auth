import React from "react";
import { Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const isLogIn = JSON.parse(localStorage.getItem("login"));
  console.log(isLogIn);
  return (
    <>
      {isLogIn && isLogIn.userLogin ? (
        <>
          <Container className="d-flex justify-content-center items-align-center">
            <Alert className="w-50 mt-5" variant="primary">
              Welcome back User
            </Alert>
          </Container>
        </>
      ) : (
        <>
          <Container className="d-flex justify-content-center items-align-center">
            <Alert className="w-50 mt-5" variant="primary">
              <Alert.Heading>
                Hey, it seem's like you are not login
              </Alert.Heading>
              <hr />
              <Alert variant="primary">
                If you have an account, then please&nbsp;
                <Link className="home-link" to="/login">
                  Login
                </Link>
                .
              </Alert>
              <Alert variant="primary">
                Don't have a account, then please do{" "}
                <Link className="home-link" to="/register">
                  Register
                </Link>
                .
              </Alert>
            </Alert>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
