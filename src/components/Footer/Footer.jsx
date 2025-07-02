import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div data-aos="fade-up">
      <section className="f-wrapper innerWidth">
        <div className=" footer innerWidth">
          <div className="footer-container">
            <div className="footer-menu">
              <div className="footer-menu-img">
                <img src="/logovenorablack@2x@2x.png" alt="Venora Logo" />
              </div>
            </div>
            <div className="footer-menu">
              <div className="footer-menu-copyright">
                <h1 className='primaryText'>Copyright</h1>
                <p className='secondaryText line-height'>&copy; Venora architects and construction 2023</p>
                <p className='secondaryText line-height'>Design & Development by Venora</p>
              </div>
            </div>
            <div className="footer-menu">
              <div className="footer-menu-contact">
                <h1 className='primaryText'>Liên Hệ</h1>
                <p className='secondaryText line-height'>667 Văn Tiến Dũng 3, Hòa Xuân, Cẩm Lê, Đà Nẵng, Da Nang, Vietnam</p>
                <p className='secondaryText line-height'><a href="mailto:contact.venoradesign@gmail.com">Email:contact.venoradesign@gmail.com</a></p>
                <p className='secondaryText line-height'><a href="tel:0948739075">Điện Thoại: 094 873 90 75</a></p>
              </div>
            </div>
            <div className="footer-menu">
              <div className="footer-menu-maps">
                <h1 className='primaryText'>Bản đồ</h1>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.5570867376287!2d108.2115156758913!3d15.984489941699286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421a67f5e3940b%3A0x5dc3f293c3aee39f!2zNjY3IFbEg24gVGnhur9uIETFqW5nLCBIb8OgIFh1w6JuLCBD4bqpbSBM4buHLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1751432334170!5m2!1svi!2s"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-end">
        <p className='secondaryText'>&copy; Bản quyền thuộc về Venora Design & Contructions</p>
      </div>
    </div>
  );
}

export default Footer;
