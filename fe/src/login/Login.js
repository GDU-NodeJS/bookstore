import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/api/guest/auth/authenticate', {
        email: email,
        password: password
      });
      const responseData = response.data;
      const token = responseData.token;
      const role = responseData.data[0].role
  
      // Xác định tên của cookie tùy thuộc vào vai trò
      const cookieName = role === 'Admin' ? 'jwt' : 'client_jwt';
  
      // Lưu token vào cookie với tên tương ứng
      document.cookie = `${cookieName}=${token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
      console.log(`Token đã được lưu vào cookie "${cookieName}":`, token);
      
      // Xác định đường dẫn tùy thuộc vào vai trò
      const redirectPath = role === 'Admin' ? '/admin' : '/client';
  
      // Chuyển hướng đến trang tương ứng với vai trò
      navigate(redirectPath);
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </label>
      <br />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default LoginForm;
