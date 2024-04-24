import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import { getJsessionIdFromResponse } from "../../component";
import { authenticateApi, cartApi } from "../../api/api";
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cart, setCart] = useState()
    const cookies = new Cookies()
    const getCart = async () => {
        try {
            let cartResponse;

            axios.defaults.withCredentials = true;
            cartResponse = await cartApi.getAllNoToken();

            const cartData = cartResponse;
            let sumQuantityBooks = 0;
            let sumPrice = 0;
            const cart1 = {
                products: cartData.data.map(cartProduct => {
                    sumQuantityBooks += cartProduct.quantity
                    sumPrice += cartProduct.quantity * cartProduct.book.price
                    return {
                        // idcart: cartProduct.cart.id,
                        idcartitem: cartProduct.id,
                        id: cartProduct.book.id,
                        img: cartProduct.book.bookImage,
                        name: cartProduct.book.name,
                        author: cartProduct.book.author,
                        description: cartProduct.book.description,
                        price: cartProduct.book.price,
                        quantity: cartProduct.quantity
                    };
                })
            };
            setCart(cart1);
            console.log('cart1: ', cart1)
        } catch (error) {
            console.error('Lỗi khi kiểm tra và lấy dữ liệu giỏ hàng:', error);
        }
    };
    useEffect(()=>{
        getCart()
    },[])
    const handleAddToCart = async (product, quantity) => {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const isLoggedIn = cookies.get('token')
        console.log('token: ',isLoggedIn)
        axios.defaults.withCredentials = true;
        try {
            if (isLoggedIn) {
                for (let i = 0; i < quantity; i++) {
                    const response = await axios.post(`http://localhost:8080/api/client/cart/add/${product.id}`, null, {
                        // Đặt các headers cần thiết cho request, ví dụ như Authorization header nếu cần
                        headers: {
                            'Authorization': `Bearer ${isLoggedIn}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.data.status === 200) {
                        console.log('Sản phẩm đã được thêm vào giỏ hàng thành công:', response.data);
                        // getCart()
                    }
                }
            } else {
                for (let i = 0; i < quantity; i++) {
                    const response = await axios.post(`http://localhost:8080/api/client/cart/add/${product.id}`, null, {
                        // Đặt các headers cần thiết cho request, ví dụ như Authorization header nếu cần
                        headers: {
                            'Authorization': `Bearer ${isLoggedIn}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.data.status === 200) {
                        console.log('Sản phẩm đã được thêm vào giỏ hàng thành công:', response.data);
                        // getCart()
                    }
                }
            }
        } catch (error) {
            // Xử lý lỗi nếu request gặp vấn đề
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            // Hiển thị thông báo lỗi cho người dùng hoặc xử lý lỗi khác tùy theo nhu cầu
        }
    }
    const handleDeleteItemCartSession = async (product) => {

        axios.defaults.withCredentials = true
        const responsedelete = await axios.post(`http://localhost:8080/api/client/cart/delete/${product.id}`);
        if (responsedelete.data.status === 200) {
            console.log('Sản phẩm đã được xoa khoi giỏ hàng thành công:', responsedelete.data);
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();     
        axios.defaults.withCredentials = true;
        const params = {
            "email": `${username}`,
            "password": `${password}`
        }
        const response = await authenticateApi.authen(params)
        if (response.status === 200) {
            // Lưu JSESSIONID vào cookies
            // console.log('response: ', response.headers)
            // const jsessionId = getJsessionIdFromResponse(response);
            // console.log('session: ',jsessionId)
            // cookies.set('JSESSIONID', jsessionId, { path: '/' });

            // Lưu các thông tin khác vào cookies
            cookies.set('userRole', response.data[0].role, { path: '/', maxAge: 604800 }); // expires in 7 days
            cookies.set('firstname', response.data[0].firstName, { path: '/', maxAge: 604800 }); // expires in 7 days
            cookies.set('lastname', response.data[0].lastName, { path: '/', maxAge: 604800 }); // expires in 7 days
            cookies.set('username', response.data[0].email, { path: '/', maxAge: 604800 }); // expires in 7 days
            cookies.set('token', response.token, { path: '/', maxAge: 604800 }); // expires in 7 days

            console.log('Đăng nhập thành công');
            if (cart) {
                cart.products.forEach((element) => {
                    handleAddToCart(element, element.quantity)
                    handleDeleteItemCartSession(element)
                })
            }
            window.location.href = '/';
        }
    };


    return (
        <div className="container">
            <h2>Login Page</h2>
            <form onSubmit={()=>handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
