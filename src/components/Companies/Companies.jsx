import React from 'react'
import './Companies.css'
import CountUp from 'react-countup';
const Companies = () => {
  return (
    <div>
        <section className='c-wrapper paddings'>
            <div className="paddings innerWidth flexCenter c-container">
              <div className="flexCenter starts">
            <div className="flexColCenter stat">
              <span><CountUp start={8800} end={100} duration={4}></CountUp><span>+</span></span>
              <span className='text-c-wrapper'>Tư vấn </span>
            </div>
            <div className="flexColCenter stat">
              <span><CountUp start={7950} end={1500} duration={4}></CountUp><span>+</span></span>
              
              <span className='text-c-wrapper'>Khách hàng</span>
            </div>
            <div className="flexColCenter stat">
              <span><CountUp start={1950} end={15} duration={4}></CountUp><span>+</span></span>
              
              <span className='text-c-wrapper'>Đội ngũ</span>
            </div>
            <div className="flexColCenter stat">
              <span><CountUp end={28}></CountUp><span>+</span></span>
              
              <span className='text-c-wrapper'>Xây dựng</span>
            </div>
            </div> 
            </div>
        </section>
    </div>
  )
}

export default Companies
