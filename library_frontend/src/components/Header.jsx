import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo3 from "./Admin/img/logo3.png";
import axios from "axios";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [cateogries, setCategories] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get("search") || ""
  );

  useEffect(() => {
    setIsAdmin(!!user.is_admin);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const config = {
        method: "get",
        maxBodayLength: Infinity,
        url: `${import.meta.env.VITE_API}/library/categories`,
        headers: {},
      };

      const response = await axios.request(config);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/?search=${search}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    return;
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="p-3 shadow-sm">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo3}
            width="100px"
            className="d-inline-block align-top mr-2"
            alt="Logo"
          />
          {/* <span className="font-weight-bold">MyWebsite</span> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="mr-auto">
            <Nav.Link href="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="mx-2">
              About us
            </Nav.Link>
            <NavDropdown
              title="Category"
              id="basic-nav-dropdown"
              className="mx-2"
            >
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                cateogries.map((cateogries, index) => (
                  <NavDropdown.Item href="#" key={index}>
                    {cateogries.name}
                  </NavDropdown.Item>
                ))
              )}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Form inline className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" className="mr-2" type="submit">
              Search
            </Button>
          </Form>
          {user ? (
            <>
              {isAdmin === true ? (
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Button>
              )}

              {/* <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button> */}
            </>
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
