import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'Swiper/css';
import './Residencies.css';
import { HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database"; 
import { SliderSettings } from '../../utils/common';

const Residencies = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const projectsRef = ref(db, 'products'); 

    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const projectsArray = Object.values(data || {}); 
      setProjects(projectsArray.slice(0, 5)); 
    });
  }, []);

  return (
    <section id='typical' className='r-wrapper r-container-s'>
      
      <div className='paddings innerWidth r-container'>
        <div className="r-head flexColStart">
          <span className='orangeText'>Dự Án Tiêu Biểu</span>
          <span className='primaryText'>Xây Dựng Tiêu Biểu</span>
        </div>
        <Swiper {...SliderSettings}>
          <SliderButtons />
          {projects.map((project, i) => (
            <SwiperSlide key={i}>
              <Link 
                to={`/product/${project.id}`} 
                state={{ product: project }} 
                className='flexColStart r-card r-card-banner'
                onClick={() => window.scrollTo(0, 0)}  
              >
                <img id='img-banner' src={project.image} alt={project.name} />
                <div className="info-product flexColStart">
                <span className='secondaryText r-price flexCenter'>
                  <HiLocationMarker style={{color:'var(--text-yellow)'}} />
                  <span>{project.add}</span>
                </span>
                <span className='primaryText r-title'>{project.name}</span>
                <span className='secondaryText r-size'>Diện tích: {project.size}m&#178;</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className='r-card-view-more'>
              <Link to="/products" className="button">Xem thêm</Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className='flexCenter r-buttons'>
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
