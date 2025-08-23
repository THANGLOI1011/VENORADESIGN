import React, { useState, useEffect } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      <section className={`h-wrapper with-bg`}>
        <div className="flexCenter paddings  innerWidth h-container">
          <a href="/">
            <img src="/LOGO.png" alt="logo" width={170} />
          </a>
          <OutsideClickHandler
            onOutsideClick={() => {
              setmenuOpened(false);
            }}
          >
            <div className="flexCenter h-menu" style={getMenuStyle(menuOpened)}>
              <Link className="textWhite" to="/about" onClick={() => setmenuOpened(false)}>
                VÊ CHÚNG TÔI
              </Link>
              <Link className="textWhite dropdown-product" to="/product" onClick={() => setmenuOpened(false)}>
                DỰ ÁN
              </Link>
              <Link className="textWhite" to="/tiktok-products" onClick={() => setmenuOpened(false)}>
                VIDEO CÔNG TRÌNH
              </Link>
              {/* <Link className="textWhite" to="/" onClick={() => setmenuOpened(false)}>
                TIN TỨC
              </Link> */}
              <Link
                to='/contact'
                id="button"
                className=" textWhite"
                onClick={() => setmenuOpened(false)}
              >
                LIÊN HỆ
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
