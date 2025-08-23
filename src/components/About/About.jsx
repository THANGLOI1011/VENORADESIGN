import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className="about-container">
      <div className="innerWidth paddings about-wrapper">
        <div className=" flexColStart u-container">
          <span className="secondaryText">Về Chúng Tôi</span>
          <span className="primaryText text-about">VENORA DESIGN</span>
          <span className="secondaryText">
            Venora Design được hình thành từ năm 2022 dưới dạng một đội ngũ
            thiết kế trẻ đầy nhiệt huyết. <br />
            Đến năm 2024, chúng tôi chính thức hoạt động dưới danh nghĩa Venora
            Design, với mục tiêu mang tới những công trình kiến trúc hiện đại,
            đẹp mắt và phù hợp với nhu cầu sống đương đại.
          </span>
        </div>
        <div className="left-container ">
          <span className="secondaryText">
            Tiên phong trong việc đưa mini villa trở thành xu hướng tại Việt
            Nam, Venora Design mang đến trải nghiệm sống như resort ngay trong
            chính ngôi nhà của bạn – nơi hội tụ vẻ đẹp tinh tế, công năng tiện
            nghi và chi phí tối ưu.
          </span>
          <span className="secondaryText">
            Venora hướng tới việc kiến tạo những không gian sống vừa thẩm mỹ,
            vừa bền vững, đặt con người làm trung tâm trong mọi thiết kế.
          </span>
          <span className="secondaryText">
            Chúng tôi tin rằng một ngôi nhà không chỉ là nơi trú ngụ, mà còn là
            nền tảng nuôi dưỡng cảm xúc, kết nối gia đình và nâng tầm chất lượng
            sống mỗi ngày.
          </span>
        </div>
      </div>
      <div className="about-image innerWidth">
        <img src="/about.jpg" alt="about" />
      </div>
      <div className="btn-text-more">
        <a href="/about">Xem thêm</a>
      </div>
    </div>
  );
};

export default About;
