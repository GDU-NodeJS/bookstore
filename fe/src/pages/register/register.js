import React, { useState, useEffect } from 'react';
import './style.scss'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [height, setHeght] = useState()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu form đến server để xử lý đăng ký
        console.log(formData);
    };

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             Last Name:
    //             <input
    //                 type="text"
    //                 name="lastName"
    //                 value={formData.lastName}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <br />
    //         <label>
    //             First Name:
    //             <input
    //                 type="text"
    //                 name="firstName"
    //                 value={formData.firstName}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <br />
    //         <label>
    //             Email:
    //             <input
    //                 type="email"
    //                 name="email"
    //                 value={formData.email}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <br />
    //         <label>
    //             Password:
    //             <input
    //                 type="password"
    //                 name="password"
    //                 value={formData.password}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <br />
    //         <label>
    //             Confirm Password:
    //             <input
    //                 type="password"
    //                 name="confirmPassword"
    //                 value={formData.confirmPassword}
    //                 onChange={handleChange}
    //             />
    //         </label>
    //         <br />
    //         <button type="submit">Register</button>
    //     </form>
    // );
    useEffect(() => {
        setHeght(window.innerHeight)
    }, [])
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

                    <h2>Đăng nhập</h2>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button type="submit">Register</button>
                    </form>

                </div>
            </div>
            <div style={{ height: `${height * (10 / 100)}px` }}></div>
        </div>
    );
}
export default RegisterForm;
