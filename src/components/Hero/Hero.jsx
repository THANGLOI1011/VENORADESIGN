import React from 'react'
import "./Hero.css"
import Slider from "react-slick"
import { motion } from 'framer-motion'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true, 
  };
  return (
    <div>
      <section className='hero-wrapper'>
        <div className=" flexCenter hero-container">
        <div className=" flexColStart hero-left">
          <div className="hero-title">
            <div className='orange-circle'></div>
            <motion.h1
            initial={{y: "2rem",opacity: 0}}
            animate={{y: 0,opacity: 1}}
            transition={{
              duration: 2,
              type:"spring"
            }}
            >
              Venora<br></br> Architects

            </motion.h1>
          </div>
        </div>
        <div className="flexCenter  ">
            <div className="image-container">
            <Slider {...settings}>
            <div className="image-container">
                <img src="/hero-image.jpg" alt="heroimage1" />
              </div>
            <div className="image-container">
                <img src="./value.jpg" alt="heroimage2" />
              </div>
              <div className="image-container">
                <img src="./contact.jpg" alt="heroimage3" />
              </div>
            </Slider>  
            </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Hero