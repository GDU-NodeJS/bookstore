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
      const role = responseData.data[0].role;

      // Chỉ xử lý nếu người dùng là Admin
      if (role === 'Admin') {
        // Lưu token vào cookie
        document.cookie = `jwt=${token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

        // Lưu token vào session storage
        sessionStorage.setItem('jwt', token);

        // Chuyển hướng đến trang admin
        navigate('/admin');
      } else {
        console.error('Bạn không có quyền truy cập');
      }
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
