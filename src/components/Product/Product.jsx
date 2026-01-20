import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./Product.css";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const CATEGORY_LIST = [
  { key: "nhavuon", label: "Nhà vườn" },
  { key: "villa", label: "Villa" },
  { key: "nhapho", label: "Nhà phố" },
  { key: "congtrinhthucte", label: "Công trình thực tế" },
];

const getCategoryKey = (category) => {
  if (!category || typeof category !== "string") return "other";
  if (category === "nhapho") return "nhapho";
  if (category === "congtrinhthucte") return "congtrinhthucte";
  if (category === "nhavuon") return "nhavuon";
  if (category === "villa") return "villa";
  return "other";
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("nhavuon");
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(db, "products");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.values(data));
      } else {
        setProducts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredProducts = products
    .filter((item) => getCategoryKey(item.category) === activeCategory)
    .reverse();

  return (
    <section id="productPage">
      <div className="product-list-bg ">
        <img src="/image-tiktok2.jpg" alt="product-list-bg" />
      </div>
      <div className="product-list-wrapper product-list-container paddings innerWidth">
        <div className="product-list-head">
          <span className="primaryText">DỰ ÁN ĐÃ THỰC HIỆN</span>
          <div className="product-list-categories">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat.key}
                className={`category-btn${
                  activeCategory === cat.key ? " active" : ""
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="product-list-grid">
          {filteredProducts.map((project, idx) => (
            <div
              className="product-card"
              key={project.id || idx}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/product/${project.id}`, {
                  state: { product: project },
                })
              }
            >
              <div className="product-card-img-wrapper">
                <img
                  src={project.image}
                  alt={project.images?.name || project.name}
                />
                <div
                  className="product-card-info"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(255,255,255,0.90)",
                    padding: "16px 24px",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  <span
                    className="primaryText r-title"
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      textTransform: "uppercase",
                    }}
                  >
                    {project.name}
                  </span>
                  <div 
                  className="r-info"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "0.3fr 1fr",
                      gap: 0,
                      marginTop: 16,
                      textAlign: "left",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="secondaryText r-size"
                      style={{ color: "#666666", fontWeight: 500 }}
                    >
                      Diện tích:
                    </span>
                    <span
                      className="secondaryText r-size"
                      style={{ color: "#666666", fontWeight: 500 }}
                    >
                      {project.size}m&#178;
                    </span>
                    <span
                      className="secondaryText r-price"
                      style={{ color: "#666666", fontWeight: 500 }}
                    >
                      Vị trí:
                    </span>
                    <span
                      className="secondaryText r-price"
                      style={{ color: "#666666", fontWeight: 500 }}
                    >
                      {project.add}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
