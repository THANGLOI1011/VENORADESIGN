import React from 'react';
import './ContactHome.css';
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { BsFacebook } from "react-icons/bs";
const CONTACT_LIST = [
  {
    icon: <IoLocationSharp />,
    title: 'Địa Chỉ',
    value: '667 Văn Tiến Dũng, Hòa Xuân, Cẩm Lệ, Đà Nẵng',
    link: 'https://maps.app.goo.gl/295F6qScGcWYUi3PA', // link Google Maps
  },
  {
    icon: <MdEmail />,
    title: 'Email',
    value: 'contact.venoradesign@gmail.com',
    link: 'mailto:contact.venoradesign@gmail.com',
  },
  {
    icon: <ImPhone />,
    title: 'Điện Thoại',
    value: '094 873 90 75',
    link: 'tel:0948739075',
  },
  {
    icon: <BsFacebook />,
    title: 'Facebook',
    value: 'Venora Design',
    link: 'https://web.facebook.com/profile.php?id=61556348097034',
  },
];

const ContactHome = () => {
  return (
    <div>
      <section className="contact-section ">
        <div className='paddings'>
        <div className="contact-title ">LIÊN HỆ</div>
        <div className="contact-box-list  innerWidth">
          {CONTACT_LIST.map((item, idx) => (
            <a
              className="contact-box"
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="contact-icon">{item.icon}</div>
              <div className="contact-box-title">{item.title}</div>
              <div className="contact-box-value">{item.value}</div>
            </a>
          ))}
        </div>

        </div>
      </section>
    </div>
  );
};

export default ContactHome;
