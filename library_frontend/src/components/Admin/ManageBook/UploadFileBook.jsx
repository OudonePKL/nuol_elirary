import "../css/sb-admin-2.min.css";
import "../vendor/fontawesome-free/css/all.min.css";
// Bootstrap core JavaScript
import "../vendor/jquery/jquery.min.js";
import "../vendor/bootstrap/js/bootstrap.bundle.min.js";
// Core plugin JavaScript
import "../vendor/jquery-easing/jquery.easing.min.js";
// Custom scripts for all pages
import "../js/sb-admin-2.min.js";

import undraw_profile from "../img/undraw_profile.svg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function UploadFileBook() {
  const [cateogries, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [publication, setPublication] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("publication_date", publication);
    formData.append("category", categoryId);
    formData.append("pdf", file);
    formData.append("cover", cover);

    setIsUploading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/library/books/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust according to your auth mechanism
          },
        }
      );
      setMessage("File uploaded successfully");
      console.log(response.data);
    } catch (error) {
      setMessage("Error uploading file");
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
      // Reset form values
      setName("");
      setPublication("");
      setCategoryId("");
      setFile(null);
      setCover(null);

      // Reset file input fields
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }
    }
  };

  return (
    <div id="wrapper">
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">SIRI Admin</div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <a className="nav-link" href="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Managements</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="buttons.html">
                Buttons
              </a>
              <a className="collapse-item" href="cards.html">
                Cards
              </a>
            </div>
          </div>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        <li className="nav-item">
          <a className="nav-link" href="/upload-book">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Upload Book</span>
          </a>
        </li>
      </ul>
      <div id="content-wrapper" className="d-flex flex-column">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* <!-- Topbar Search --> */}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-search fa-fw"></i>
              </a>
              {/* <!-- Dropdown - Messages --> */}
              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            {/* <!-- Nav Item - Alerts --> */}
            <li className="nav-item dropdown no-arrow mx-1">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-bell fa-fw"></i>
                {/* <!-- Counter - Alerts --> */}
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
              {/* <!-- Dropdown - Alerts --> */}
              <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
              >
                <h6 className="dropdown-header">New user</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">
                      A new monthly report is ready to download!
                    </span>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 7, 2019</div>
                    $290.29 has been deposited into your account!
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-warning">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 2, 2019</div>
                    Spending Alert: We have noticed unusually high spending for
                    your account.
                  </div>
                </a>
                <a
                  className="dropdown-item text-center small text-gray-500"
                  href="#"
                >
                  Show All Alerts
                </a>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  Douglas McGee
                </span>
                <img
                  className="img-profile rounded-circle"
                  src={undraw_profile}
                />
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>

        {/* Body content */}
        <main id="main" className="main">
          <section className="section">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Upload Book</h3>
                {message && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    {message}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputText"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        // value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                      >
                        <option></option>
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          cateogries.map((cateogries, index) => (
                            <option key={index} value={cateogries.id}>
                              {cateogries.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      Publication date
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputText"
                        value={publication}
                        onChange={(e) => {
                          setPublication(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="cover" className="col-sm-2 col-form-label">
                      Cover
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="cover"
                        href={coverInputRef}
                        onChange={(e) => setCover(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="pdf" className="col-sm-2 col-form-label">
                      File
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="pdf"
                        href={fileInputRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    {/* <label className="col-sm-2 col-form-label">
                    Submit Button
                  </label> */}
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">
                        {isUploading ? "Uploading..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default UploadFileBook;
