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
    <section id='typical' className='r-wrapper paddings r-container-s'>
      
      <div className='innerWidth  r-container'>
        <div className="r-head flexColStart">
          <span className='primaryText'>DỰ ÁN NỔI BẬT</span>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          navigation={false}
          {...SliderSettings}
        >
          <SliderButtons />
          {projects.map((project, i) => (
            <SwiperSlide key={i}>
              <Link 
                to={`/product/${project.id}`} 
                state={{ product: project }} 
                className='r-card-banner'
                onClick={() => window.scrollTo(0, 0)}  
                style={{ display: 'block', height: '100%' }}
              >
                <div className="r-card-img-wrapper" style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                  <img
                    id='img-banner'
                    src={project.image}
                    alt={project.name}
                    style={{ width: '100%', height: '390px', objectFit: 'cover', display: 'block' }}
                  />
                  <div
                    className="r-card-info"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255,255,255,0.90)',
                      padding: '16px 24px',
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  >
                    <span className='primaryText r-title' style={{ fontWeight: 700, fontSize: 18,textTransform: 'uppercase' }}>
                      {project.name}
                    </span>
                    <div
                    className='r-info'
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '0.3fr 1fr',
                        gap: 0,
                        marginTop: 16,
                        textAlign: 'left',
                        alignItems: 'center'
                      }}
                    >
                      <span className='secondaryText r-size' style={{ color: '#666666', fontWeight: 500 }}>
                        Diện tích:
                      </span>
                      <span className='secondaryText r-size' style={{ color: '#666666', fontWeight: 500 }}>
                        {project.size}m&#178;
                      </span>
                      <span className='secondaryText r-price' style={{ color: '#666666', fontWeight: 500 }}>
                        Vị trí:
                      </span>
                      <span className='secondaryText r-price' style={{ color: '#666666', fontWeight: 500 }}>
                        {project.add}
                      </span>
                    </div>
                  </div>
                  
                </div>
                <div className='r-card-text btn-text-more'>
                      <a href="">Khám phá ngay</a>
                  </div>
              </Link>
            </SwiperSlide>
          ))}
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
