// import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  let book_id = useParams().id;
  const [book, set_book] = useState([]);
  const [books, set_books] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BookDetail();
    AllBooks();
  }, []);

  // console.log(book_id);

  const BookDetail = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/library/books/${book_id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_book(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AllBooks = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/library/books",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_books(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Store the intended destination before navigating to signin
        localStorage.setItem("intendedDestination", window.location.pathname);
        // If token is missing, navigate to signin page
        navigate("/signin");
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/library/books/${book_id}/download-pdf/`,
        {
          responseType: "blob", // Important to specify this to handle binary data
          headers: {
            Authorization: `Bearer ${token}`, // Adjust as per your auth mechanism
          },
        }
      );

      // Create a URL for the blob and set it as the href attribute
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.name}.pdf`); // Name the file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("There was an error downloading the file!", error);
    }
  };

  return (
    <div>
      <Header />
      {/* <!-- Product section--> */}
      <section className="py-5">
        {/* <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={
                  book.cover ||
                  "https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                }
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{book.name}</h1>
              <div className="fs-5 mb-5">
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0 me-5"
                  type="button"
                  onClick={() => {
                    navigate(`/detail/${book_id}/read`);
                  }}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Read Book
                </button>
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={() => {
                    handleDownload();
                  }}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container my-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                className="img-fluid mb-3"
                src={book.cover || 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'}
                alt="Book cover"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">{book.name}</h2>
              <div className="d-flex">
                <button
                  className="btn btn-outline-primary me-3"
                  type="button"
                  onClick={() => {
                    navigate(`/detail/${book_id}/read`);
                  }}
                >
                  <i className="bi-cart-fill me-1"></i> Read Book
                </button>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => {
                    handleDownload();
                  }}
                >
                  <i className="bi-cart-fill me-1"></i> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Related items section--> */}
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-5 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
            {books.length === 0 ? (
              <p className="no-reviews-message">No Order</p>
            ) : (
              books.map((book) => (
                <div className="col mb-5" key={book.id}>
                  <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img
                      className="card-img-top h-100"
                      src={
                        book.cover ||
                        "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                      }
                      alt="..."
                      // style={{ width: "50%"}}
                    />
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                      <div className="text-center">
                        {/* <!-- Product name--> */}
                        <h5 className="fw-bolder">{book.name}</h5>
                      </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <a
                          className="btn btn-outline-primary mt-auto"
                          href={`/detail/${book.id}`}
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {/* <!-- Footer--> */}
      <Footer />
      {/* <!-- Bootstrap core JS--> */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      {/* <!-- Core theme JS--> */}
      <script src="js/scripts.js"></script>
    </div>
  );
}

export default ProductDetail;
