// import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  console.log(email);
  console.log(password);

  const Login = () => {
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/user/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const result = response.data;
        const token = result.token.access;
        const user = {
          email: result.email,
          is_admin: result.is_admin,
          is_director: result.is_director,
          user_name: result.user_name,
          user_id: result.user_id,
          image: result.image,
        };
        if (token) {
          window.localStorage.setItem("token", token);
        }
        window.localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      <Header />
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h3>Sign In Form</h3> <br />
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          onChange={(e) => {
            set_email(e.target.value);
          }}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          onChange={(e) => {
            set_password(e.target.value);
          }}
        />
        <div className="d-flex justify-content-between mx-3 mb-4">
          <p></p>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <MDBBtn
          className="mb-4 btn-dark"
          onClick={() => {
            Login();
          }}
        >
          Sign in
        </MDBBtn>
        <div className="text-center">
          <p>
            Do not have an account? <a href="/signup">Register</a>
          </p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default SignIn;
