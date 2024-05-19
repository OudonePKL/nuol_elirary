// import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Header from "./Header";
import Footer from "./Footer";

function SignUp() {
  return (
    <div>
      <Header />
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h3>Sign Up Form</h3> <br />
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Verified Code"
          id="form2"
          type="text"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="First name"
          id="form3"
          type="text"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form4"
          type="password"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Confirm Password"
          id="form5"
          type="password"
        />
        <MDBBtn className="mb-4 btn-primary">Sign Up</MDBBtn>
        <div className="text-center">
          <p>
            Already have an account? <a href="/signin">Log in</a>
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

export default SignUp;
