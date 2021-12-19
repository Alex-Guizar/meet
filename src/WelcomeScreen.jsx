// Packages
import React from "react";

// React-Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// CSS
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
  (
    <div className="WelcomeScreen">
      <Navbar className="navbar-bg-site_blue navbar-text-pink">
        <Container>
          <Navbar.Brand>Meet</Navbar.Brand>
        </Container>
      </Navbar>
      <h1>Welcome to the Meet app</h1>

      <h4>Log in to see upcoming events around the world for full-stack developers</h4>

      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <button onClick={() => { props.getAccessToken() }}
            rel="nofollow noopener"
            className="btn-text"
          >
            <b>Sign in with google</b>
          </button>
        </div>
      </div>

      <a
        href="https://Alex-Guizar.github.io/meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : 
  null
}

export default WelcomeScreen;