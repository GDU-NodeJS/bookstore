import React, { memo, useState, useEffect } from "react";
import Header from "../users/theme/header";
import Footer from "../users/theme/footer";
import axios from "axios";
import Cookies from "universal-cookie";
import './style.scss'
import Image from '../../assets/meo-chien-binh-tap-6-thoi-khac-tam-toi_128863_1.jpg'
import { useNavigate, useLocation } from "react-router-dom";
import { cartApi } from "../../api/api";
const CreateOrder = () => {
    const [cart, setCart] = useState()
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()
    const location = useLocation();
    const selectedBooks = location.state?.selectedBooks
    const cookies = new Cookies()
    const [cartItemSelected, setCartItemSelected] = useState()
    console.log('selected: ',selectedBooks)
    
    useEffect(() => {
        getCart();
    }, []);
    const getCart = async () => {
        const isLoggedIn = cookies.get('token');
        try {
            let cartResponse;
            if (isLoggedIn) {
                axios.defaults.withCredentials = true;
                cartResponse = await cartApi.getAll();
            } else {
                axios.defaults.withCredentials = true;
                cartResponse = await axios.get('http://localhost:8080/api/client/cart/getAll');
            }
            const cartData = cartResponse;
            let sumQuantityBooks = 0;
            let sumPrice = 0;
            const cart1 = {
                id: cartData.data[0].cart.id,
                products: cartData.data.map(cartProduct => {
                    sumQuantityBooks += cartProduct.quantity
                    sumPrice += cartProduct.quantity * cartProduct.book.price

                    return {
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
            setAmount(sumQuantityBooks)
            setPrice(sumPrice)
            console.log('cart1: ',cart1)
            const selectedBooksInCart = cartData.data.filter(item => selectedBooks.includes(item.id.toString()));
            setCart(selectedBooksInCart);
        } catch (error) {
            console.error('Lỗi khi kiểm tra và lấy dữ liệu giỏ hàng:', error);
        }
    };
    const handleOrder = async (arr) => {

        for (const a of arr) {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.post(`http://localhost:8080/api/client/cart/checkout/${a}`, null, {
                    headers: {
                        Authorization: `Bearer ${cookies.get('token')}`
                    }
                });
                if(response.data.status === 200) {
                    navigate('/cart')
                }
            } catch (error) {
                console.error('Lỗi khi thực hiện thanh toán và xóa giỏ hàng:', error);
            }
        }

    }
    console.log('cart', cart)
    return (
        <>
            <Header amount={amount} />
            <div className="container">
                <div className="orderpage_header">
                    <span>Số lượng</span>
                    <span>Giá</span>
                </div>
                <div className="list_book">
                    {cart ? (
                        cart.map((item, index) => (
                            <div key={index} className="book_detail">
                                <div className="img" style={{ backgroundImage: `url(${Image})` }}></div>
                                <div className="book_detail_text">
                                    <div>{item.book.name}</div>
                                    <div>{item.book.author}</div>
                                </div>
                                <div className="quantity"><span>{item.quantity}</span></div>
                                <div className="price"><span>{item.book.price * item.quantity}</span></div>
                            </div>
                        ))
                    ) : (
                        <div>không kết nối được với giỏ hàng</div>
                    )}
                </div>
                <div className="box_payment_price">

                    <div className="payment_method">
                        <div className="">Phương thức thanh toán:</div>
                        <div>thanh toán khi nhận hàng</div>
                    </div>
                    <div className="price_box">
                        <div>Tổng tiền:</div>
                        <div>{price}</div>
                    </div>
                </div>
                <div className="button_box">
                    <button className="button_cancel" onClick={()=> navigate('/cart')}>Hủy</button>
                    <button className="button_order" onClick={() => handleOrder(selectedBooks)}>Đặt hàng</button>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default memo(CreateOrder)