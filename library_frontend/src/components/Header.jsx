import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  console.log(user);

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you can implement your search logic, e.g., redirect to search results page or update state
    console.log("Search for:", searchQuery);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    return;
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
      </nav>
    </div>
  );
}

export default Header;
