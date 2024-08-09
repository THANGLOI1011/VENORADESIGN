import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'Swiper/css'
import './Residencies.css'
import data from '../../utils/slider.json'
import { SliderSettings } from '../../utils/common'
const Residencies = () => {
  return (
   <section className='r-wrapper'>
    <div className=' paddings innerWidth r-container'>
        <div className="r-head flexColStart">
            <span className='orangeText'>Best Choise</span>
            <span className='primaryText'>Popular Residencis</span>
        </div>
        <Swiper {...SliderSettings}>
            <SliderButtons></SliderButtons>
            {
                data.map((card, i)=>(
                    <SwiperSlide key={i}>
                        <div className=' flexColStart r-card'>
                            <img src={card.image} alt="home" />
                            <span className='secondaryText r-price'>
                            <span style={{color:'orange'}}>$</span><span>{card.price}</span>
                            </span>
                            <span className='primaryText r-title'>{card.name}</span>
                            <span className='secondaryText'>{card.detail}</span>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
   </section>
  )
}

export default Residencies
const SliderButtons = () => {
    const swiper = useSwiper();
    return(
        <div className=' flextCenter r-buttons'>
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    );
}
