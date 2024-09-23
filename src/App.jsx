import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import './App.css';
import Companies from "./components/Companies/Companies";
import Residencies from "./components/Residensies/Residencies";
import Value from "./components/Value/Value";
import Contact from "./components/Contact/Contact";
import Getstarted from "./components/Getstarted/Getstarted";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/Product";
import ProductDetail from './components/ProductDetail/ProductDetail';
import { useEffect, useState } from 'react';
import BackToTop from './components/BackToTop/BackToTop';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Loading from './components/Loading/Loading';

// Cuộn đến ID khi trang được tải
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Hiển thị loading khi điều hướng giữa các trang
  useEffect(() => {
    setLoading(true);
    
    const timeout = setTimeout(() => {
      setLoading(false); // Giả lập thời gian tải, bạn có thể thay thế bằng logic thực tế
    }, 1000); // Thời gian loading giả lập là 1 giây

    return () => clearTimeout(timeout); // Hủy timeout khi component unmount
  }, [location]);

  return (
    <div className="App">
      <Header />
      <ScrollToHashElement />
      {loading ? (
        <Loading /> // Hiển thị loading khi trang đang tải
      ) : (
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Companies />
              <Residencies id="typical" />
              <Value id="value" />
              <Contact id="contact" />
              <Getstarted id="started" />
            </>
          } />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      )}
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
