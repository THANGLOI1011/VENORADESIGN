
import React, { useState } from 'react'
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi'
import OutsideClickHandler from "react-outside-click-handler"
const Header = () => {
  const [menuOpened,setmenuOpened] = useState(false)
  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: !menuOpened && "-100%"
      }
    }
  }
  return (
    <div>
      <section className='h-wrapper'>
        <div className='flexCenter paddings innerWidth h-container'>
            <img src="./logo.png" alt="logo" width={100} />
            <OutsideClickHandler onOutsideClick={() =>{
              setmenuOpened(false)
            }}
            >
            <div className="flexCenter h-menu" style={getMenuStyle(menuOpened)}>
                <a href="#">Residencies</a>
                <a href="#">Our Value</a>
                <a href="#">Contact Us</a>
                <a href="#">Get Started</a>
                <button className='button'>
                    <a href="#">Contact</a>
                </button>
            </div>
            </OutsideClickHandler>
            <div className="menu-icon" onClick={() => setmenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30}></BiMenuAltRight>
        </div>
        </div>
        
      </section>
    </div>
  )
}

export default Header
