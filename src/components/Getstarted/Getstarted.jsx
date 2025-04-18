import React from 'react'
import './Getstarted.css'
const Getstarted = () => {
  return (
    <div>
      <section id='started' className='g-wrapper'>
        <div className="  innerWidth g-container">
            <div className="flexColCenter inner-container paddings">
                <span className='primaryText text-about '>Chúng Tôi Luôn Giữ Phương Châm</span>
            </div>
            <div className='icon-product'>
              <div className='icon-product-item'>
                <img src="/lightbulb-on.svg" alt="icon-creative" />
                <span className='secondarytext'>Thiết kế sáng tạo</span>
              </div>
              <div className='icon-product-item'>
                <img src="/quality.svg" alt="icon-quality" />
                <span  className='secondarytext'>Chất lượng vượt trội</span>
              </div>
              <div className='icon-product-item'>
                <img src="/practice.svg" alt="icon-practice" />
                <span  className='secondarytext'>Sự đổi mới sáng tạo</span>
              </div>
              <div className='icon-product-item'>
                <img src="/suggestion.svg" alt="icon-suggestion" />
                <span  className='secondarytext'>Hỗ trợ khách hàng</span>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Getstarted
