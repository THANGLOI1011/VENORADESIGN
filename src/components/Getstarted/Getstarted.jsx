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
                <img src="/idea.png" alt="icon-creative" />
                <span className='secondarytext text-green'>Thiết kế sáng tạo</span>
              </div>
              <div className='icon-product-item'>
                <img src="/quality.png" alt="icon-quality" />
                <span  className='secondarytext text-green'>Chất lượng vượt trội</span>
              </div>
              <div className='icon-product-item'>
                <img src="/practice.png" alt="icon-practice" />
                <span  className='secondarytext text-green'>Sự đổi mới sáng tạo</span>
              </div>
              <div className='icon-product-item'>
                <img src="/suggestion.png" alt="icon-suggestion" />
                <span  className='secondarytext text-green'>Hỗ trợ khách hàng</span>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Getstarted
