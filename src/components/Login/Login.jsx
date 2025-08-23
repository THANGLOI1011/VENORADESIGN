import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
        const user = userCredential.user;
        setUserName(user.email);
        navigate('/admin');
      })
      .catch(() => {
        setError('Đăng nhập thất bại, bạn không phải là admin');
      });
  };

  return (
    <div className="login-bg">
      <div className="login-layout">
        <div className="login-left">
          <h1 className="login-title">VENORA</h1>
          <p className="login-desc">
            Chào mừng bạn đến với <a className="login-link">Venora</a> – Kiến tạo không gian, nâng tầm giá trị.
          </p>
        </div>
        <div className="login-right">
          <form className="login-form" onSubmit={handleLogin}>
            <h2 className="login-form-title">LOGIN</h2>
            {error && <p className='texterror'>{error}</p>}
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button className='login-btn' type="submit">
              Login <span style={{marginLeft:8}}>→</span>
            </button>
            {userName && <p>Xin chào, {userName}!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
