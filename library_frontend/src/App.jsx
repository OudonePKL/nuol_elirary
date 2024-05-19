import { BrowserRouter, Routes, Route } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ProductDetail from "./components/ProductDetail";
import Dashboard from "./components/Admin/Dashboard";
import UploadBook from "./components/UploadBook";
import BookReader from "./components/BookReader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin page */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-book" element={<UploadBook />} />
          <Route path="/detail/:id/read" element={<BookReader />} />
          {/* User page */}
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          {/* Authentications */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
