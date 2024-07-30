import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./styles.css";
// import "./Admin/css/bootstrap.min.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

    fatchBooks();
  }, []);

  return (
    <div>
      {/* Navigation */}
      <Header />

      {/* Header */}
      <header className="bg-primary py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">E-Library</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              E-Library Descriptions
            </p>
          </div>
        </div>
      </header>

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
                  <Card.Img variant="top" src={book.cover} /><br />
                  <Card.Text className="text-primary">{book.name}</Card.Text>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <div className="card-body">
          {/* <!-- Disabled and active states --> */}
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  // tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
