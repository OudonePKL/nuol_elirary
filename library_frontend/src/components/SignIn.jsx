// import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Header from "./Header";
import Footer from "./Footer";

function SignIn() {
  return (
    <div>
      <Header/>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h3>Sign In Form</h3> <br />
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
        />
        <div className="d-flex justify-content-between mx-3 mb-4">
          <p></p>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <MDBBtn className="mb-4 btn-dark">Sign in</MDBBtn>
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
      <Footer/>
    </div>
  );
}

export default SignIn;
