import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import Login from "../Pages/Login";
import Checkout from "../Pages/Checkout";
import PeriodicService from "../Pages/PeriodicService";
import ReviewsPage from "../Pages/ReviewsPage";
import ContactUs from "../Pages/ContactUs";
import Faq from "../Pages/FAQ";
import Terms from "../Pages/Terms";
import Privacy from "../Pages/Privacy";
import Offers from "../Pages/Offers";
import Blogs from "../Pages/Blogs";
import Coupon from "../Pages/Coupon";
import Register from "../Pages/Register";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/periodicService" element={<PeriodicService />} />

      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/coupon" element={<Coupon />} />
      {/* <Route path="/addtocart" element={<Product />} /> */}
    </Routes>
  );
};
