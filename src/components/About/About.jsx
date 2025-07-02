import React from 'react'
import './About.css'
import { GrFormNextLink } from "react-icons/gr";
const About = () => {
  return (
    <div>
      <div className=' innerWidth flexcenter'>
        <div className='paddings flexColStart u-container'>
          <span className='primaryText text-about'>Về Chúng Tôi</span>
          <span className='secondaryText line-height slogantext'>Tại Venora, chúng tôi không chỉ thiết kế nhà, mà còn kiến tạo không gian sống đẳng cấp và tinh tế. Với tầm nhìn hướng đến sự hoàn hảo, Venora cam kết mang đến cho bạn những thiết kế sáng tạo, bền vững, và chất lượng vượt trội.
            Venora hiện thực hóa tầm nhìn của bạn bằng những thiết kế sáng tạo, bền vững.
          </span>
          <a href="/Value">
          <div className='text-more'>
          <a className='secondaryText view-more'>Xem thêm </a>
          <div className='icon-more'><GrFormNextLink /></div>
          </div>
          </a>
        </div>
        
      </div>
      <div className="img-value  ">
            <img className='img-value' src="https://res.cloudinary.com/dxo8lnvlm/image/upload/v1741175463/476631203_122208792596211603_3200218464541819110_n.jpg_bptkld.jpg" alt="" />
          </div>
    </div>
  )
}

export default About
