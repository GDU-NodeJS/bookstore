import React, { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu form đến server để xử lý đăng ký
        console.log(formData);
    };

    return (
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
    );
};

export default RegisterForm;
