import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div>
        <section f-wrapper>
            <div className="paddings innerWidth flexCenter f-container">
                {/* left side */}
                <div className="flexColStart f-left">
                    <img src="./logo2.png" alt="" width={120} />
                    <span className='secondaryText'>Our visoin is to make all people <br></br>
                    the best place to live for them.
                    </span>
                </div>
                <div className="flexColStart f-right">
                    <span className='primaryText'>Infomation</span>
                    <span className='secondaryText'>145 New York, Fl 4571,USA</span>
                    <div className="flexCenter f-menu">
                        <span>Property</span>
                        <span>Service</span>
                        <span>Product</span>
                        <span>About Us</span>
                    </div>

                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer
