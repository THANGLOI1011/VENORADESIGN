import React from "react";
import "./Value.css";

const TEAM_LIST = [
  {
    name: "NGUYỄN QUỐC THÔNG",
    position: "FOUNDER & CEO",
    image: "https://res.cloudinary.com/dxo8lnvlm/image/upload/v1755592640/1G2A9730_pszuwg.jpg",
  },
  {
    name: "NGUYỄN CHIẾN THẮNG",
    position: "CO-FOUNDER & 3D VISUAL",
    image: "https://res.cloudinary.com/dxo8lnvlm/image/upload/v1755592637/1G2A9779_iwjztu.jpg",
  },
  {
    name: "HUỲNH TRUNG TRUNG",
    position: "TRIỂN KHAI KIẾN TRÚC",
    image: "/trung.jpg",
  },
  {
    name: "NGUYỄN VĂN HUY",
    position: "MARKETING",
    image: "/huy.jpg",
  },
  {
    name: "PHAN TIẾN CÔNG",
    position: "CONCEPT & TRIỂN KHAI KIẾN TRÚC",
    image: "https://res.cloudinary.com/dxo8lnvlm/image/upload/v1755592631/1G2A9579_fqbnez.jpg",
  },
  {
    name: "PHÙNG TIẾN TỈNH",
    position: "CONCEPT & 3D VISUAL",
    image: "https://res.cloudinary.com/dxo8lnvlm/image/upload/v1755592599/TINH_2_bypfbe.jpg",
  },
  {
    name: "HOÀNG KIM TRIỀU",
    position: "KIẾN TRÚC SƯ",
    image: "https://res.cloudinary.com/dxo8lnvlm/image/upload/v1755592623/TRI%E1%BB%80U_tcbott.jpg",
  },
  {
    name: "ĐỖ MINH THẠCH",
    position: "MARKETING",
    image: "/thach.jpg",
  },
];

const Value = () => {
  // 3 người quan trọng đầu tiên
  const mainMembers = TEAM_LIST.slice(0, 2);
  // Các thành viên còn lại
  const otherMembers = TEAM_LIST.slice(3);

  return (
    <div className="about-team-wrapper">
      <div className="about-team-img">
        <img src="/about1.jpg" alt="Venora Team" />
      </div>
      <div className="about-team-section paddings">
        <div className="about-team-title">VỀ CHÚNG TÔI</div>
        <div className="about-team-desc">
          VENORA DESIGN bắt đầu hoạt động từ năm 2020 dưới hình thức một team thiết kế nhỏ, khởi đầu bằng tình yêu nghề cũng như trách nhiệm đối với người thân và gia đình của <br />đội ngũ Founders.
        </div>
      </div>
      <hr className="about-team-divider" />
      <div className="about-team-section paddings">
        <div className="about-team-title">ĐỘI NGŨ NHÂN SỰ</div>
        <div className="about-team-desc">
          Chúng tôi là tập thể những con người chung niềm đam mê sáng tạo, đồng hành trong mọi dự án để mang đến giá trị bền vững và khác biệt.
        </div>
        {/* Hàng đầu: 3 người */}
        <div className="about-team-row-main">
          {mainMembers.map((member, idx) => (
            <div className="about-team-card" key={idx}>
              <div className="about-team-card-img">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="about-team-card-name">{member.name}</div>
              <div className="about-team-card-pos">{member.position}</div>
            </div>
          ))}
        </div>
        {/* Các hàng sau: 4 item trên 1 hàng */}
        <div className="about-team-grid">
          {otherMembers.map((member, idx) => (
            <div className="about-team-card" key={idx}>
              <div className="about-team-card-img">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="about-team-card-name">{member.name}</div>
              <div className="about-team-card-pos">{member.position}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Value;