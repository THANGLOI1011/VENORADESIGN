import React, { useState, useEffect } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setScrolled(window.scrollY > 0);
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Hàm xử lý cuộn đến phần tử theo id
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,  // Điều chỉnh khoảng cách để tránh bị che khuất bởi header
        behavior: 'smooth',
      });
    }
  };

  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: !menuOpened && '-100%',
      };
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <div>
      <section className={`h-wrapper ${isHomePage && scrolled ? 'scrolled' : ''} ${!isHomePage ? 'with-bg' : ''}`}>
        <div className='flexCenter paddings innerWidth h-container'>
          <a href="/">
            <img src="/logovenora@2x.png" alt="logo" width={60} />
          </a>
          <OutsideClickHandler
            onOutsideClick={() => {
              setmenuOpened(false);
            }}
          >
            <div className="flexCenter h-menu" style={getMenuStyle(menuOpened)}>
              <Link className='textWhite' to="/products" onClick={() => setmenuOpened(false)}>Tất Cả Dự Án</Link>
              <span className='textWhite' onClick={() => { scrollToSection('value'); setmenuOpened(false); }}>Về Chúng Tôi</span>
              <span className='textWhite' onClick={() => { scrollToSection('typical'); setmenuOpened(false); }}>Dự Án Tiêu Biểu</span>
              <span className='textWhite' onClick={() => { scrollToSection('started'); setmenuOpened(false); }}>Bắt Đầu</span>
              <button id='button' className='button textWhite' onClick={() => { scrollToSection('contact'); setmenuOpened(false); }}>
                Liên Hệ
              </button>
            </div>
          </OutsideClickHandler>
          <div
            className="menu-icon"
            onClick={() => setmenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
