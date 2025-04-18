import React, { useEffect, useState } from 'react';
import './Hero.css';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ref, get } from 'firebase/database'; 
import { db } from '../../firebase'; 

const Hero = () => {
  const [images, setImages] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    ltr: true,
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Create a reference to the Realtime Database path where your image URLs are stored
        const imagesRef = ref(db, 'heroImages'); // Replace 'heroImages' with the correct path in your database
        const snapshot = await get(imagesRef);
        if (snapshot.exists()) {
          const imageList = Object.values(snapshot.val()); // Convert the result to an array of URLs
          setImages(imageList);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <section className="hero-wrapper">
        <div className="flexCenter hero-container">
          <div className="flexColStart hero-left">
            <div className="hero-title">
              <div className="orange-circle"></div>
              <motion.h1
                initial={{ y: '2rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: 'spring',
                }}
              >
                Venora
                <br />
                Architects
              </motion.h1>
            </div>
          </div>
          <div className="flexCenter">
            <div className="image-container">
              <Slider {...settings}>
                {images.map((imageUrl, index) => (
                  <div key={index} className="image-container">
                    <img src={imageUrl} alt={`heroimage${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
