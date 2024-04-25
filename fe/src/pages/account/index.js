import React, { memo, useEffect, useState } from 'react'
import Header from '../users/theme/header'
import Footer from '../users/theme/footer'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Image from '../../assets/meo-chien-binh-tap-6-thoi-khac-tam-toi_128863_1.jpg'
import './style.scss'
import { bookApi, cartApi, orderApiForCustomer } from '../../api/api'
import { formatCurrency } from '../../utils/format_tien'
const Account = () => {
    const cookies = new Cookies()
    const [amount, setAmount] = useState(0)
    const [orders, setOrders] = useState()
    const [language, setLanguage] = useState(0)
    const getCart = async () => {
        const isLoggedIn = cookies.get('token');
        console.log('token:', isLoggedIn)
        try {
            let cartResponse;
            if (isLoggedIn) {
                axios.defaults.withCredentials = true;
                // Người dùng đã đăng nhập
                cartResponse = await cartApi.getAll();
                console.log('da dang nhap')
            } else {
                // Người dùng chưa đăng nhập
                axios.defaults.withCredentials = true;
                cartResponse = await cartApi.getAll()
            }

            const cartData = cartResponse;
            let sumQuantityBooks = 0;
            const cart1 = {
                products: cartData.data.map(cartProduct => {
                    sumQuantityBooks += cartProduct.quantity
                    return {
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
        } catch (error) {
            console.error('Lỗi khi kiểm tra và lấy dữ liệu giỏ hàng:', error);
        }
    };
    useEffect(() => {
        getCart()
    }, [])
    useEffect(() => {
        getOrder()
    }, [])
    const getOrder = async () => {
        const isLoggedIn = cookies.get('token')
        if (isLoggedIn) {

            try {
                axios.defaults.withCredentials = true
                const response = await orderApiForCustomer.getAll(isLoggedIn);
                if (response.status === 200) {
                    // const orders = await Promise.all(response.data.map(async (b) => {
                    //     // console.log('booklist: ', b.booklist[0])
                    //     const res = await bookApi.getById(b.booklist[0]);
                    //     console.log('book: ',res.data)
                    //     if (res.status === 200) {
                    //         return {
                    //             status: b.status,
                    //             date: b.date,
                    //             payment: b.payment,
                    //             book: res.data,
                    //             id: b.id,
                    //             userid: b.user_id
                    //         };
                    //     }
                    // }));
                    // setOrders(orders.filter(order => order !== undefined)); // Loại bỏ các phần tử không xác định (undefined)
                    setOrders(response.data)
                }
            } catch (e) {
                console.error('Lỗi khi lấy đơn hàng:', e);
            }
        }
    }
    const handleCancel = async (id) => {
        const response = await orderApiForCustomer.cancel(id)
        if (response.status === 200) {
            getOrder()
        }
    }
    console.log('orders: ', orders)
    window.orders = orders
    return (
        <>
            <Header amount={amount} />
            {cookies.get('token') ?
                <div className='container'>
                    <div className='box_user'>
                        <div className='box_user_name'>
                            <div style={{ marginRight: '10px' }}>Tên:</div>
                            <div>{cookies.get('firstname') + " " + cookies.get('lastname')}</div>
                        </div>
                        <div className='box_user_email'>

                            <div style={{ marginRight: '10px' }}>Email:</div>
                            <div>{cookies.get('username')}</div>
                        </div>
                        <div className='box_user_sdt'>

                            <div style={{ marginRight: '10px' }}>SDT:</div>
                            <div>0582132246</div>
                        </div>
                        <div className='box_user_bird'>

                            <div style={{ marginRight: '10px' }}>Ngày sinh:</div>
                            <div>25/02/2003</div>
                        </div>
                        <div className='box_user_address'>

                            <div style={{ marginRight: '10px' }}>Địa chỉ:</div>
                            <div>Phước Tân 1, Tân Hưng, TP Bà Rịa, Tỉnh BRVT</div>
                        </div>
                    </div>
                    <div className='box_user_orders'>

                        {orders &&
                            <div className='box_user_orders_header'>Tất cả đơn hàng</div>
                        }
                        {orders &&

                            <ul style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <li style={{ width: '8%', textAlign: 'center' }}>số lượng</li>
                                <li style={{ width: '12%', textAlign: 'center' }}>giá</li>
                                <li style={{ width: '12%', textAlign: 'center' }}>Thành tiền</li>
                            </ul>}
                        <div className='box_user_orders_body'>
                            {orders && orders.map((order, index) => (
                                <div className='box_book'>
                                    <div className='book_img' style={{ backgroundImage: `url(${order.bookList.bookImage})` }}></div>
                                    <div className='book_detail'>
                                        <div className='detail'>
                                            <div className='name_author'>
                                                <div>{order.bookList.name}</div>
                                                <div>{order.bookList.author}</div>
                                            </div>
                                            <div className='book_quantity' style={{ textAlign: 'center' }}>{(order.payment / order.bookList.price)}</div>
                                    
                                            <div className='price_payment' >
                                                <div style={{ textAlign: 'center' }}>{formatCurrency((order.payment / (order.payment / order.bookList.price)) + (order.payment % (order.payment / order.bookList.price)),language)}</div>
                                                <div style={{ textAlign: 'center' }}>{formatCurrency(order.payment, language)}</div>
                    
                                            </div>
                                        </div>
                                        <div className='box_status'>
                                            <div className='status'>
                                                <div style={{ marginRight: '10px' }}>Trạng thái:</div>
                                                {order.status === 'PENDING' ?
                                                    <div>Đang chuẩn bị sản phẩm</div> :
                                                    order.status === 'PROCESSING' ?
                                                        <div>Đang vận chuyển</div> :
                                                        order.status === 'DELIVERED' ?
                                                            <div>Đang giao hàng</div> :
                                                            <div>???</div>
                                                }
                                            </div>
                                            <div>
                                                {order.status === 'PENDING' &&
                                                    <button onClick={()=> handleCancel(order.id)}>cancel</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>

                    </div>
                </div>
                : <div>bạn chưa đăng nhập</div>}
            <Footer />
        </>
    )
}
export default memo(Account)