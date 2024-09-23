import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./Product.css";
import { ref, onValue } from "firebase/database";
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedProducts = Object.values(data);
        setProducts(loadedProducts);
      }
    });
  }, []);

  const handleCardClick = (product) => {
    // Cuộn lên đầu trang trước khi điều hướng
    window.scrollTo(0, 0);

    // Điều hướng tới trang chi tiết sản phẩm
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div>
      <div className="product-list flexCenter innerWidth paddings">
        {products.map((product) => (
          <div
            key={product.id}
            className="flexColStart r-card r-card-product"
            onClick={() => handleCardClick(product)}
          >
            <img src={product.image} alt={product.name} />
            <span className='secondaryText r-price flexCenter'>
              <HiLocationMarker style={{color:'var(--text-yellow)'}} />
              <span>{product.add}</span>
            </span>
            <span className='primaryText r-title'>{product.name}</span>
            <span className='secondaryText'>Diện tích: {product.size}m&#178;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
