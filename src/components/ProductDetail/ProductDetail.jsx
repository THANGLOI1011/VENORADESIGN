import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetail.css';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product || JSON.parse(localStorage.getItem('product')) || {};
  const images = Array.isArray(product.images) ? product.images : [];

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});

    // Scroll to section based on URL hash
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    return () => {
      Fancybox.destroy(); // Cleanup Fancybox when component is unmounted
    };
  }, []);

  return (
    <div className="product-detail-container innerWidth">
      <div className="product-detail-name">
        <h1 className='primaryText flexCenter'>{product.name}</h1>
        <div className="product-detail-name-deps">
        <p className='secondaryText'>Năm: {product.year}</p>
        <p className='secondaryText'>Vị trí: {product.add}</p>
        <p className='secondaryText'>Diện tích: {product.size}m&#178;</p>
        <p className='textDeps'>Mô tả:</p>
        <p className='secondaryText txtDeps'>{product.deps}</p>
        </div>
      </div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <a href={image} data-fancybox="gallery" key={index}>
            <img className="gallery-image" src={image} alt={`Detail ${index}`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
