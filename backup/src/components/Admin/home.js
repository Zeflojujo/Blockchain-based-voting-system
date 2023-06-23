import React from 'react';
// import './lll.css';
// import 'url' from 'https://fonts.googleapis.com/css?family=Montserrat:400,800';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
// cd

const SignInComponent = () => {
  const handleSignUpClick = () => {
    const main = document.getElementById('main');
    main.classList.add('right-panel-active');
  };

  const handleSignInClick = () => {
    const main = document.getElementById('main');
    main.classList.remove('right-panel-active');
  };

  return (
    <div className="container" id="main">
      <div className="sign-up">
        <form action="">
          <h1>Sign In</h1>
          <p>For Admin Only</p>
          <div className="social-container">
            <a href="#g" className="social-container">
              {/* <FontAwesomeIcon icon={faFacebookF} /> */}
            </a>
            <a href="#fg" className="social-container">
              {/* <FontAwesomeIcon icon={faGooglePlusG} /> */}
            </a>
            <a href="#d" className="social-container">
              {/* <FontAwesomeIcon icon={faLinkedinIn} /> */}
            </a>
          </div>
          <p>Click below button to Sign In as an Admin</p>
          <button id="admin">sign In</button>
        </form>
      </div>

      <div className="sign-in">
        <form action="">
          <h4>The University of Dodoma</h4>
          <p>Blockchain Based Voting System</p>
          <div className="social-container">
            <a href="" className="social-container">
              {/* <FontAwesomeIcon icon={faFacebookF} /> */}
            </a>
            <a href="" className="social-container">
              {/* <FontAwesomeIcon icon={faGooglePlusG} /> */}
            </a>
            <a href="" className="social-container">
              {/* <FontAwesomeIcon icon={faLinkedinIn} /> */}
            </a>
          </div>

          <a href="">
            Don't you have an account?<span>Create Account</span>
          </a>
          <button id="voter">sign in</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
            <h1>Welcome Back!</h1>
            <p>Secure platform based on a new and rapid emerging technology of Blockchain</p>
            <button onClick={handleSignInClick}>Voter</button>
          </div>

          <div className="overlay-right">
            <h1>Hello</h1>
            <p>Welcome to the Blockchain Based Electronic Voting system for Higher Learning Institutions.</p>
            <button onClick={handleSignUpClick}>Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
