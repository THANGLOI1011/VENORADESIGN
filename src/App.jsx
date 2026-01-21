import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";
import ProductHome from "./components/ProductHome/ProductHome";
import Residencies from "./components/Residensies/Residencies";
import Value from "./components/Value/Value";
import Contact from "./components/Contact/Contact";
import ContactHome from "./components/ContactHome/ContactHome";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/Product";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { useEffect, useState } from "react";
import BackToTop from "./components/BackToTop/BackToTop";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Loading from "./components/Loading/Loading";
import About from "./components/About/About";
import TikTok from "./components/TikTok/TikTok";
import TikTokDetail from "./components/TikTokDetail/TikTokDetail";
import TikTokProduct from "./components/TikTokProduct/TikTokProduct";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  const isSpecialPage =
    location.pathname === "/admin" || location.pathname === "/login";

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Venora - Thiết Kế & Thi Công Nội Thất";
        break;
      case "/product":
        document.title = "Dự Án";
        break;
      case "/product/:id":
        document.title = "Chi Tiết Dự Án";
        break;
      case "/video-viral":
        document.title = "Video Công Trình";
        break;
      case "/video/:id":
        document.title = "Chi Tiết Video";
        break;
      case "/login":
        document.title = "Login";
        break;
      case "/admin":
        document.title = "Admin";
        break;
      case "/contact":
        document.title = "Liên Hệ";
        break;
      case "/about":
        document.title = "Về Chúng Tôi";
        break;
      case "/tiktok-products":
        document.title = "Video Công Trình";
        break;
      default:
        document.title = "";
    }
  }, [location]);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    AOS.refresh();
  }, [location]);

  return (
    <div className="App">
      {!isSpecialPage && <Header />}
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div data-aos="fade-up">
                  <Hero />
                </div>
                
                <div data-aos="fade-up">
                  <About id="about" />
                </div>
                <div data-aos="fade-left">
                  <Residencies id="typical" />
                </div>
                <div data-aos="fade-right">
                  <ProductHome id="productHome" />
                </div>
                <div data-aos="fade-up">
                  <TikTok id="tiktok" />
                </div>
                <div data-aos="fade-up">
                  <ContactHome />
                </div>
              </>
            }
          />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tiktok/:videoId" element={<TikTokDetail />} />
          <Route path="/tiktok-products" element={<TikTokProduct />} />
          <Route path="/about" element={<Value />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
      {!isSpecialPage && <Footer />}
      <BackToTop />
    </div>
  );
}

export default App;
