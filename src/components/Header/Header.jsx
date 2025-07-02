import React, { useState, useEffect } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Header = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Lấy id từ state của react-router-dom
    const { state } = location;
    if (location.pathname === '/' && state?.scrollToId) {
      const element = document.getElementById(state.scrollToId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 50, // Điều chỉnh khoảng cách
          behavior: 'smooth',
        });
      }
    }
  }, [location]);

  // Hàm xử lý cuộn đến phần tử theo id
  const handleScrollToSection = (id) => {
    if (location.pathname === '/') {
      // Nếu đang ở trang chủ, cuộn ngay lập tức
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 50, // Điều chỉnh khoảng cách header
          behavior: 'smooth',
        });
      }
    } else {
      // Nếu không ở trang chủ, chuyển hướng với state chứa id cần cuộn
      navigate('/', { state: { scrollToId: id } });
    }
    setmenuOpened(false); // Đóng menu
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
        <div className="flexCenter paddings innerWidth h-container">
          <a href="/">
            <img src="/logovenora@2x.png" alt="logo" width={60} />
          </a>
          <OutsideClickHandler
            onOutsideClick={() => {
              setmenuOpened(false);
            }}
          >
            <div className="flexCenter h-menu" style={getMenuStyle(menuOpened)}>
              <Link className="textWhite" to="/product" onClick={() => setmenuOpened(false)}>
                Tất Cả Dự Án
              </Link>
              <Link className="textWhite" to="/value" onClick={() => setmenuOpened(false)}>
                Về Chúng Tôi
              </Link>
              <span className="textWhite" onClick={() => handleScrollToSection('typical')}>
                Dự Án Tiêu Biểu
              </span>
              <Link className="textWhite" to="/tiktok-products" onClick={() => setmenuOpened(false)}>
              Video Viral
              </Link>
              <Link
              to='/contact'
                id="button"
                className=" textWhite"
                onClick={() => setmenuOpened(false)}
                

              >
                Liên Hệ
              </Link>
            </div>
          </OutsideClickHandler>
          <div className="menu-icon" onClick={() => setmenuOpened((prev) => !prev)}>
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
