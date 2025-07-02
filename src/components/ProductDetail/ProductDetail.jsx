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
    <div data-aos="fade-up" className="product-detail-container innerWidth">
      <div className="product-detail-name">
        <h1 className='primaryText flexCenter'>{product.name}</h1>
        <div className="product-detail-name-deps">
        <p className=' line-height txt-project'>Dự án: {product.name}</p>
        {/* <p className='textDeps'>Mô tả:</p> */}
        <p className='secondaryText txtDeps'>{product.deps}</p>
        <ul className='info-product-list'>    
        <li className='secondaryText line-height'>Thiết kế: Công Ty Venora Design</li>
        <li className='secondaryText line-height'>Năm: {product.year}</li>
        <li className='secondaryText line-height'>Vị trí: {product.add}</li>
        <li className='secondaryText line-height'>Diện tích: {product.size}m&#178;</li>
        </ul>
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
