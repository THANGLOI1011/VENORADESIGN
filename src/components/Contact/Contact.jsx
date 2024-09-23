import React from 'react'
import './Contact.css'
import { MdCall } from 'react-icons/md'
import { SiGmail } from 'react-icons/si'
import { FaFacebook, FaTiktok } from 'react-icons/fa'

const Contact = () => {
  return (
    <div>
      <section id='contact' className='c-wrapper '>
        <div className=" innerWidth flexCenter c-container">
          <div className="flexColStart c-left paddings ">
            <span className='orangeText'>Liên Hệ Với Chúng Tôi</span>
            <span className='primaryText'>Liên Hệ Dễ Dàng</span>
            <span className='secondaryText'>Chúng tôi luôn sẵn sàng hỗ trợ bạn và mang lại những dịch vụ tốt nhất.</span>
            
            <div className="flexColStart contactModes">
              {/* First row */}
              <div className="flexStart row">
                {/* Phone */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div id='phone' className="flexCenter icon">
                      <MdCall size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Điện Thoại</span>
                      <span className='secondaryText'>070 804 0810</span>
                    </div>
                  </div>
                  <div className="flexCenter button">
                    <a href='tel:0708040810' className="btn btn-primary">Gọi Ngay</a>
                  </div>
                </div>
                {/* Gmail */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div id='gmail' className="flexCenter icon">
                      <SiGmail size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Gmail</span>
                      <span className='secondaryText'>contact.venoradesign@gmail.com</span>
                    </div>
                  </div>
                  <div className="flexCenter button">
                    <a href='mailto:contact.venoradesign@gmail.com' className="btn btn-primary">Gửi Ngay</a>
                  </div>
                </div>
              </div>
              
              {/* Second row */}
              <div className="flexStart row">
                {/* Facebook */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div id='facebook' className="flexCenter icon">
                      <FaFacebook size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Facebook</span>
                      <span className='secondaryText'>Venora Designer</span>
                    </div>
                  </div>
                  <div className="flexCenter button">
                    <a href='https://www.facebook.com/profile.php?id=61556348097034' target='_blank' className="btn btn-primary">Theo Dõi</a>
                  </div>
                </div>
                {/* Tiktok */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      < FaTiktok size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Tiktok</span>
                      <span className='secondaryText'>@venoradesign</span>
                    </div>
                  </div>
                  <div className="flexCenter button">
                    <a href='https://www.tiktok.com/@venoradesign?is_from_webapp=1&sender_device=pc' target='_blank' className="btn btn-primary">Theo Dõi</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side */}
          <div className="c-right paddings">
            <div className="img-container">
              <img src="./contact.jpg" alt="contact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
