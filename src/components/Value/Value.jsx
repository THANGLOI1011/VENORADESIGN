import React, { useState } from 'react'
import { Accordion, AccordionItem,AccordionItemHeading,AccordionItemButton,AccordionItemPanel,AccordionItemState
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import './Value.css'
import data from '../../utils/accordion'
const Value = () => {
  return (
    <section id='value' className='v-wrapper'>
      <div className=" innerWidth flexCenter v-container">
        
        {/* right- side */}
        <div className=" flexColStart v-right paddings">
          <span className='orangeText'>Về Chúng Tôi</span>
          <span className='primaryText'>Giá Trị Trao Cho Bạn</span>
          <span className='secondaryText line-height'>Tại Venora, chúng tôi không chỉ thiết kế nhà, mà còn kiến tạo không gian sống đẳng cấp và tinh tế. Với tầm nhìn hướng đến sự hoàn hảo, Venora cam kết mang đến cho bạn những thiết kế sáng tạo, bền vững, và chất lượng vượt trội.Venora hiện thực hóa tầm nhìn của bạn bằng những thiết kế sáng tạo, bền vững. Chúng tôi tạo nên những không gian truyền cảm hứng, vừa vận hành hiệu quả, vừa trường tồn với thời gian, đảm bảo mang đến giá trị vượt trội trong mọi dự án.
          </span>
          <Accordion className='accordion' allowZeroExpanded={false} allowMultipleExpanded={false} preExpanded={[0]}>
            {
              data.map((item,i) => {
                const [className,setClassName] =useState(null)
                return(
                  <AccordionItem className={'accordionItem ${className}'} key={i} uuid={i}>
                    <AccordionItemHeading>
                      <AccordionItemButton className=' flexCenter accordionButton'>

                        <AccordionItemState>
                          {({expanded}) => 
                            expanded 
                            ? setClassName('expanded') 
                            : setClassName('colapsed')
                            }
                        </AccordionItemState>

                        <div className="flexCenter icon">{item.icon}</div>
                        <span className='primaryText'>
                          {item.heading}
                        </span>
                        <div className="flexCenter icon"><MdOutlineArrowDropDown size={20} /></div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p className="secondaryText line-height">{item.detail}</p>
                    </AccordionItemPanel>
                  </AccordionItem>
                )
              })
            }
          </Accordion>
        </div>
        {/* lefft side */}
        <div className="v-left">
          <div className="img-container-value">
            <img src="./value.jpg" alt="" />
            <div className='textslogan paddings'>
              <h1>Đến với Venora</h1>
              <p>"Kiến tạo không gian sống đẳng cấp với những thiết kế ấn tượng"</p>
            </div>
          </div>
        </div>  
      </div>
    </section>
  )
}

export default Value
