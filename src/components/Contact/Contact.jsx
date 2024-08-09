import React from 'react'
import './Contact.css'
import {MdCall} from 'react-icons/md'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'
const Contact = () => {
  return (
    <div>
      <section className='c-wrapper'>
        <div className="paddings innerWidth flexCenter c-container">
          <div className="flexColStart c-left">
            <span className='orangeText'>Our Contacts</span>
            <span className='primaryText'>Easy to Contact us</span>
            <span className='secondaryText'>We always ready to help by providijing the best services for you. We belevi a good blace to live can make your life better.</span>
            
            <div className="flexColStart contactModes">
              {/* right row */}
              <div className="flexStart row">
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <MdCall size={25}/>
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Call</span>
                      <span className='secondaryText'>0966 205 011</span>
                    </div>
                  </div>
                  <div className="flexCenter button">Call Now</div>
                </div>
                {/* second mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25}/>
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Chat</span>
                      <span className='secondaryText'>0966 205 011</span>
                    </div>
                  </div>
                  <div className="flexCenter button">Chat Now</div>
                </div>
              </div>
              {/* second row */}
              <div className="flexStart row">
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <MdCall size={25}/>
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Video Call</span>
                      <span className='secondaryText'>0966 205 011</span>
                    </div>
                  </div>
                  <div className="flexCenter button">Video Call Now</div>
                </div>
                {/* fout mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25}/>
                    </div>
                    <div className="flexColStart detail">
                      <span className='primaryText'>Chat</span>
                      <span className='secondaryText'>0966 205 011</span>
                    </div>
                  </div>
                  <div className="flexCenter button">Chat Now</div>
                </div>
              </div>
            </div>

          </div>
          {/* right */}
          <div className="c-right">
            <div className="image-container">
              <img src="./contact.jpg" alt="contact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
