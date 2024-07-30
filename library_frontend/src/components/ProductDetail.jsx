// import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./styles.css";
// import "./Admin/css/bootstrap.min.css";

function ProductDetail() {
  let book_id = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fatchBookDetail();
    fatchBooks();
  }, [book_id]);

  // console.log(book_id);

  const fatchBookDetail = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_API + `/library/books/${book_id}`,
        headers: {},
      };

      const response = await axios.request(config);
      setBook(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fatchBooks = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_API + "/library/books",
        headers: {},
      };
      const response = await axios.request(config);
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        import.meta.env.VITE_API + `/library/books/${book_id}/download-pdf/`,
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
        <div className="container my-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                className="img-fluid mb-3"
                src={
                  book.cover ||
                  "https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                }
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

      <Container>
        <h3 className="my-4">All Books</h3>
        <Row>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            books.map((book, index) => (
              <Col
                md={2}
                className="mb-4"
                key={index}
                onClick={() => navigate(`/detail/${book.id}`)}
              >
                <Card className="h-100">
                  <Card.Img variant="top" src={book.cover} /> <br />
                  <Card.Text className="text-primary">{book.name}</Card.Text>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default ProductDetail;
