import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

function Header({ isLoggedIn, handleLogin, handleLogout, handleProfile }) {
  // const user = localStorage.getItem("user");
  // const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState("");

  // console.log(user);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // Here you can implement your search logic, e.g., redirect to search results page or update state
  //   console.log("Search for:", searchQuery);
  // };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  //   return;
  // };

  return (
    <div>
      {/* Navigation */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            E-Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4"></ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary me-5" type="submit">
                Search
              </button>
            </form>
          </div>
          <form className="d-flex">
            {!user && (
              <button
                className="btn btn-primary me-2"
                type="submit"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <i className="bi-cart-fill me-1"></i>
                Log in
              </button>
            )}

            {user && (
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => {
                  handleLogout();
                }}
              >
                <i className="bi-cart-fill me-1"></i>
                Log out
              </button>
            )}
          </form>
        </div>
      </nav> */}

      <Navbar bg="light" expand="lg" className="p-3 shadow-sm">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="path/to/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top mr-2"
            alt="Logo"
          />
          <span className="font-weight-bold">MyWebsite</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="mr-auto">
            <Nav.Link href="#home" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="mx-2">
              Link
            </Nav.Link>
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
              className="mx-2"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button variant="primary" className="mr-2">
              Search
            </Button>
          </Form>
          {isLoggedIn ? (
            <>
              <Button
                variant="outline-primary"
                className="mr-2"
                onClick={handleProfile}
              >
                Profile
              </Button>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline-primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
