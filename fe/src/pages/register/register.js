import React, { useState, useEffect } from 'react';
import '../register/style.scss'
import { authenticateApi } from '../../api/api';
import {useNavigate, Link} from 'react-router-dom'
const RegisterForm = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate()
    const [height, setHeght] = useState()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        e.target.classList.remove('error')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gửi dữ liệu form đến server để xử lý đăng ký
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            const elementArray = Array.from(document.querySelectorAll('.password_body'));
            elementArray.forEach((e) => e.classList.add('error')); // Thêm class 'error' cho mỗi phần tử
            return
        }
        const params = {
            'email': `${formData.email}`,
            'password': `${formData.password}`,
            'firstName': `${formData.firstName}`,
            'lastName': `${formData.lastName}`,
        }
        console.log('params: ', params)
        const response = await authenticateApi.resgister(params)
        if (response.status === 201) {
            alert('Kiểm tra email để kích hoạt tài khoản')
            navigate('/login')
        }
    };

    useEffect(() => {
        setHeght(window.innerHeight)
    }, [window.innerHeight])
    console.log('Chiều cao của màn hình:', height);
    return (
        <div className="containe" style={{ height: `${height}px` }}>
            <div style={{
                height: `${height * (10 / 100)}px`,
                display: 'flex',
                'align-items': 'center',
                'margin-left': '50px',
                'font-size': '20px',
            }}>
                <h2>Bookstore</h2>
            </div>
            <div style={{ height: `${height * (80 / 100)}px`, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#9C90D0', margin: '' }}>
                <div style={{ width: '70%', height: `${height * (80 / 100)}px` }} className="left">
                    <h1>Bookstore</h1>
                    <span>Cửa hàng bán sách uy tín và chất lượng</span>
                </div>
                <div style={{ width: '30%', }} className="right">

                    <h2>Đăng ký</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='lastname'>
                            <span className='lastname_header'>Last Name</span>
                            <input
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='firstname'>
                            <span className='firstname_header'>First Name</span>
                            <input
                                placeholder="First name"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='email'>
                            <span className='email_header'>Email</span>
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={

                                    handleChange
                                }
                            />
                        </div>

                        <div className='password'>
                            <span className='password_header'>Password</span>
                            <input
                                className='password_body'
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                        
                            />
                        </div>

                        <div className='passwordconfirm'>
                            <span className='passwordconfirm_header'>Confirm password</span>
                            <input
                                className='password_body'
                                placeholder="Confirm password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Register</button>

                        <div className="hr">

                            <hr></hr>
                            <span className="or">hoặc</span>
                        </div>
                        <div>
                            <span>Bạn đã có tài khoản? </span>
                            <Link to='/login'>Đăng nhập</Link>
                        </div>
                    </form>

                </div>
            </div>
            <div style={{ height: `${height * (10 / 100)}px` }}></div>
        </div>
    );
}
export default RegisterForm;
