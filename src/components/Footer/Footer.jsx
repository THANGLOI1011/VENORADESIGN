import React from 'react';
import { FaFacebookF, FaTiktok, FaPhoneAlt, FaInstagram, FaEnvelope,FaPinterest  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const SOCIALS = [
  { icon: <FaFacebookF />, link: 'https://www.facebook.com/profile.php?id=61556348097034&locale=vi_VN' },
  { icon: <FaTiktok />, link: 'https://www.tiktok.com/@venoradesign' },
  { icon: <FaPhoneAlt />, link: 'tel:0948739075' },
  { icon: <FaInstagram />, link: 'https://www.instagram.com/venoradesign/?fbclid=IwY2xjawMRQ7VleHRuA2FlbQIxMABicmlkETFyWjlVS1JDQmJRYjFiVTg2AR4AK5SH4McF7L9jYZ6b5d3YzZWWqn5uhllRLx0d5FOhRoAfAB4uMJ6tfCvrQQ_aem_vIpmhboXUV7wIzobbfjEyA#' },
  { icon: <FaEnvelope />, link: 'mailto:contact.venoradesign@gmail.com' },
  { icon: <FaPinterest />, link: 'https://www.pinterest.com/kientrucvenora/?fbclid=IwY2xjawMRQ6xleHRuA2FlbQIxMABicmlkETFyWjlVS1JDQmJRYjFiVTg2AR4PFJ-_jr448xLQqQPuif7hilRCjoj5ZEyifxSmYBoNDj7qnAbnjKRNf0XBRQ_aem_gp6rXeXlZ_3ZngZyznPGTQ' },
];

const MENUS = [
  { label: 'VỀ CHÚNG TÔI', to: '/about' },
  { label: 'DỰ ÁN', to: '/product' },
  { label: 'VIDEO CÔNG TRÌNH', to: '/video' },
  { label: 'TIN TỨC', to: '/news' },
  { label: 'LIÊN HỆ', to: '/contact' },
];

const Footer = () => (
  <footer className="footer-dark paddings">
    <div className="footer-socials">
      {SOCIALS.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          {item.icon}
        </a>
      ))}
    </div>
    <div className="footer-brand">Venora Design</div>
    <nav className="footer-menu-list">
      {MENUS.map((menu, idx) => (
        <Link key={idx} to={menu.to} className="footer-menu-link">
          {menu.label}
        </Link>
      ))}
    </nav>
    <div className="footer-copyright">
      <span>© 2020 bản quyền thuộc về Venora Design & Contructions</span><br />
      <span>Tất cả quyền được bảo lưu. Phát triển bởi Venora Design & Contructions</span>
    </div>
  </footer>
);

export default Footer;