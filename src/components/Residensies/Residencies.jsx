import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'Swiper/css';
import './Residencies.css';
import { HiLocationMarker } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
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
    <section id='typical' className='r-wrapper'>
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
                className='flexColStart r-card'
                onClick={() => window.scrollTo(0, 0)}  // Cuộn lên đầu trang khi nhấn
              >
                <img src={project.image} alt={project.name} />
                <span className='secondaryText r-price flexCenter'>
                  <HiLocationMarker style={{color:'var(--text-yellow)'}} />
                  <span>{project.add}</span>
                </span>
                <span className='primaryText r-title'>{project.name}</span>
                <span className='secondaryText'>Diện tích: {project.size}m&#178;</span>
              </Link>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className='r-card-view-more'>
              <Link to="/products" className="button">View More</Link>
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
