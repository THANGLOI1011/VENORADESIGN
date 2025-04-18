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
          <div className='text-more'>
          <a className='secondaryText' href="/Value">Xem thêm </a>
          <div className='icon-more'><GrFormNextLink /></div>
          </div>
        </div>
        
      </div>
      <div className="img-value  ">
            <img className='img-value' src="https://res.cloudinary.com/dxo8lnvlm/image/upload/v1741175463/476631203_122208792596211603_3200218464541819110_n.jpg_bptkld.jpg" alt="" />
            {/* <div className='textslogan paddings'>
              <h1>Đến với Venora</h1>
              <p>"Kiến tạo không gian sống đẳng cấp với những thiết kế ấn tượng"</p>
            </div> */}
          </div>
    </div>
  )
}

export default About
