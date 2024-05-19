import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [books, set_books] = useState([]);

  useEffect(() => {
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
  }, []);

  console.log(books);

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
      {/* Section */}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">

            {books.length === 0 ? (
              <p className="no-reviews-message">No Order</p>
            ) : (
              books.map((book) => (
                // <div key={item.id} className="box_item_order">
                //   <div className="box_item_order_text">
                //     <p>ID: {item.id}</p>
                //     <p>Status: {item.status}</p>
                //   </div>
                //   <div className="txtheadeproductorder">
                //     <p>
                //       Date Time: {new Date(item.created_at).toLocaleString()}
                //     </p>
                //   </div>
                // </div>
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
                        <a className="btn btn-outline-primary mt-auto" href={`/detail/${book.id}`}>
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

      {/* Footer */}
      <Footer />

      {/* Bootstrap core JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      {/* Core theme JS */}
      <script src="js/scripts.js"></script>
    </div>
  );
}

export default Home;
