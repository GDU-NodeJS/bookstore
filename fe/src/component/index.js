import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchCartData = async () => {
    try {
        // Lấy dữ liệu giỏ hàng từ API
        const cartResponse = await axios.get('https://fakestoreapi.com/carts/5');
        const cartData = cartResponse.data;

        // Lấy danh sách sản phẩm từ API
        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        const productsData = productsResponse.data;

        // Tạo giỏ hàng mới
        const cart = {
            id: cartData.id,
            userId: cartData.userId,
            date: cartData.date,
            products: cartData.products.map(cartProduct => {
                // Tìm thông tin sản phẩm trong danh sách sản phẩm
                const product = productsData.find(product => product.id === cartProduct.productId);
                return {
                    id: cartProduct.productId,
                    name: product.title,
                    price: product.price,
                    quantity: cartProduct.quantity
                };
            })
        };

        return cart
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null
    }
};

const getTokenFromCookie = () => {
    const cookieString = document.cookie; // Lấy chuỗi cookie
    const cookies = cookieString.split('; '); // Tách các cookie thành mảng

    // Lặp qua từng cookie để tìm cookie chứa token
    for (const cookie of cookies) {
        const [name, value] = cookie.split('='); // Tách tên và giá trị của cookie
        if (name === 'your_token_cookie_name') { // Thay 'your_token_cookie_name' bằng tên thực của cookie chứa token
            return value; // Trả về giá trị của token
        }
    }

    return null; // Trả về null nếu không tìm thấy token trong cookie
};
function getJsessionIdFromResponse(response) {
    // Kiểm tra xem phản hồi có tiêu đề Set-Cookie không
    if (response.headers && response.headers['set-cookie']) {
        // Lặp qua các giá trị trong tiêu đề Set-Cookie để tìm JSESSIONID
        for (let cookie of response.headers['set-cookie']) {
            if (cookie.includes('JSESSIONID')) {
                // Trích xuất JSESSIONID từ chuỗi cookie
                const parts = cookie.split(';');
                for (let part of parts) {
                    if (part.includes('JSESSIONID')) {
                        return part.split('=')[1].trim();
                    }
                }
            }
        }
    }
    return null; // Trả về null nếu không tìm thấy JSESSIONID trong phản hồi
}
function getJsessionIdFromCookie() {
    // Lấy tất cả các cookie hiện có
    const cookies = document.cookie.split(';');

    // Duyệt qua từng cookie để tìm JSESSIONID
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Kiểm tra xem cookie có bắt đầu bằng "JSESSIONID" không
        if (cookie.startsWith('JSESSIONID=')) {
            // Nếu có, trả về giá trị của cookie
            return cookie.substring('JSESSIONID='.length, cookie.length);
        }
    }
    // Trả về null nếu không tìm thấy JSESSIONID trong cookie
    return null;
}

const getCart = async () => {
    const isLoggedIn = getTokenFromCookie()
    try {
        if (isLoggedIn) {
            // Người dùng đã đăng nhập
            const cartResponse = await axios.get('ApiCart');
            const cartData = cartResponse.data;
            // if (cartData) {
            //     // Tiếp tục xử lý dữ liệu giỏ hàng ở đây
                
            //     return cartData
            // } else {
            //     // Xử lý khi không có dữ liệu giỏ hàng trả về từ API
            //     return null
            // }
            return cartData
        } else {
            // Người dùng chưa đăng nhập
            
            let guestCart = sessionStorage.getItem('guestCart');
            if (!guestCart) {
                // Tạo giỏ hàng mặc định nếu không tìm thấy trong sessionStorage
                guestCart = {
                    id: null,
                    userId: null,
                    products: [] // Danh sách sản phẩm trong giỏ hàng
                };
            } else {
                guestCart = JSON.parse(guestCart);
            }
            
            return guestCart
            
        }

    } catch (error){
        console.error('Lỗi khi kiểm tra và lấy dữ liệu giỏ hàng:', error);
    }
}
export {
    fetchCartData,
    getTokenFromCookie,
    getCart,
    getJsessionIdFromResponse,
    getJsessionIdFromCookie
}
