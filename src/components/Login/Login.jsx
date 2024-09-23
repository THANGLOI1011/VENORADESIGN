import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'; // Đảm bảo đường dẫn đúng đến tệp firebase.js
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Lấy thông tin người dùng sau khi đăng nhập thành công
        const user = userCredential.user;
        setUserName(user.email); // Lưu tên người dùng (hoặc tên khác nếu có)
        navigate('/admin'); // Chuyển hướng đến trang admin
      })
      .catch((error) => {
        setError('Failed to log in. Please check your credentials.');
      });
  };

  return (
    <div className="login-container paddings">
      <form onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button' type="submit">Đăng nhập</button>
        {userName && <p>Xin chào, {userName}!</p>}
      </form>
    </div>
  );
};

export default Login;
