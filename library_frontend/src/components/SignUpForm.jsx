import React, { useState } from "react";
import "./SignUp.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending data to a server
    // or validating inputs
  };


  // 2
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you can handle form submission, like sending data to a server
  //   // or validating inputs
  // };

  return (
    <div>
      <div>
        <button onClick={openModal}>Login</button>

        {modalOpen && (
          <div id="id01" className="modal">
            <span onClick={closeModal} className="close" title="Close Modal">
              &times;
            </span>

            <form
              onSubmit={handleSubmit}
              className="modal-content animate"
              action="/action_page.php"
            >
              <div className="imgcontainer">
                <img src="img_avatar2.png" alt="Avatar" className="avatar" />
              </div>

              <div className="container">
                <label htmlFor="uname">
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="uname"
                  required
                />

                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  required
                />

                <button type="submit">Login</button>
                <label>
                  <input type="checkbox" checked="checked" name="remember" />{" "}
                  Remember me
                </label>
              </div>

              <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cancelbtn"
                >
                  Cancel
                </button>
                <span className="psw">
                  Forgot <a href="#">password?</a>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc" }}>
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
          />

          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={handleRememberChange}
              style={{ marginBottom: "15px" }}
            />{" "}
            Remember me
          </label>

          <p>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms & Privacy
            </a>
            .
          </p>

          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};



export default SignUpForm;
