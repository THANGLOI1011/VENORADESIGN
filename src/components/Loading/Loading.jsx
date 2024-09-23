// components/Loading.js
import React from 'react';
import './Loading.css'; // CSS riêng cho loading

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p> Đang tải...</p>
    </div>
  );
};

export default Loading;
