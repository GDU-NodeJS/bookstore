import { memo, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formatCurrency } from "../../../utils/format_tien"
import "./styles.scss"
import axios from "axios"
import Image from '../../../assets/meo-chien-binh-tap-6-thoi-khac-tam-toi_128863_1.jpg'
import Cookies from 'universal-cookie'
import Header from "../theme/header"
import Footer from "../theme/footer"
import { bookApi, cartApi } from "../../../api/api"
const Cart = () => {
    const [cart, setCart] = useState();
    const [totalBooks, setTotalBooks] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [selectedBooks, setSelectedBooks] = useState([]);
    const navigate = useNavigate()
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, value]);
        } else {
            setSelectedBooks((prevSelectedBooks) =>
                prevSelectedBooks.filter((bookId) => bookId !== value)
            );
        }
    };
    console.log(selectedBooks)
    const handleSubmitOrder = () => {
        const isLoggedIn = cookies.get('token')
        if (selectedBooks.length < 1) {
            alert('Vui lòng chọn sản phẩm để đặt hàng')
            return
        }
        if (isLoggedIn) {
            navigate('/createorder', { state: { selectedBooks } });
        } else {
            alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
        }
    };
    const cookies = new Cookies()
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
            console.log('cartData: ', cartData)
            let sumQuantityBooks = 0;
            let sumPrice = 0;
            const cartProducts = await Promise.all(cartData.data.map(async (cartProduct) => {
                sumQuantityBooks += cartProduct.quantity
                sumPrice += cartProduct.quantity * cartProduct.book.price
                const b = await bookApi.getById(cartProduct.book)
                console.log('b', b)
                if (b.data != null) {
                    return {
                        idcart: cartProduct.cart,
                        idcartitem: cartProduct._id,
                        id: cartProduct.book,
                        img: b.data.image,
                        name: b.data.name,
                        author: b.data.author,
                        description: b.data.description,
                        price: b.data.price,
                        quantity: cartProduct.quantity
                    };
                }
            }));
            setTotalBooks(sumQuantityBooks)
            setTotalPrice(sumPrice)
            setCart({ products: cartProducts });
        } catch (error) {
            console.error('Lỗi khi kiểm tra và lấy dữ liệu giỏ hàng:', error);
        }
    };
    console.log('cart: ', cart)
    const Arrayproducts = []
    if (cart && cart.products) {
        cart.products.forEach((cartproduct) => {
            Arrayproducts.push({
                products: cartproduct,
            })
        });
    } else {
        console.log('Không có sản phẩm trong giỏ hàng.')
    }
    const handleAdd = async (product) => {
        const isLoggedIn = cookies.get('token')

        try {
            if (isLoggedIn) {
                axios.defaults.withCredentials = true;
                const response = await cartApi.add(product.id)
                // if (response.data.status === 200) {
                //     console.log('Sản phẩm đã được thêm vào giỏ hàng thành công:', response.data);
                //     console.log('xxx')
                getCart()
                // }
            } else {
                axios.defaults.withCredentials = true;
                const response1 = await axios.post(`http://localhost:8080/api/client/cart/add/${product.id}`);
                if (response1.data.status === 200) {
                    console.log('Chưa đăng nhập sản phẩm đã được thêm vào giỏ hàng thành công:', response1.data);
                    getCart()
                }
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        }
    }
    const handleSubtract = async (product) => {
        const isLoggedIn = cookies.get('token')
        const updateQuantity = product.quantity - 1
        try {
            if (isLoggedIn) {
                if (updateQuantity < 1) {
                    axios.defaults.withCredentials = true;
                    const responsedelete = await axios.post(`http://localhost:8080/api/client/cart/delete/${product.id}`, null, {
                        headers: {
                            'Authorization': `Bearer ${isLoggedIn}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (responsedelete.data.status === 200) {
                        console.log('x')
                        getCart()
                    }
                }
                axios.defaults.withCredentials = true;
                const response = await axios.post(`http://localhost:8080/api/client/cart/uppdate/${product.id}/${updateQuantity}`, null, {
                    headers: {
                        'Authorization': `Bearer ${isLoggedIn}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.status === 200) {
                    console.log('Sản phẩm đã được xóa thành công:', response.data);
                    getCart()
                }
            } else {
                if (updateQuantity < 1) {
                    axios.defaults.withCredentials = true;
                    const responsedelete = await axios.post(`http://localhost:8080/api/client/cart/delete/${product.id}`);
                    if (responsedelete.data.status === 200) {
                        getCart()
                    }
                }
                axios.defaults.withCredentials = true;
                const response1 = await axios.post(`http://localhost:8080/api/client/cart/uppdate/${product.id}/${updateQuantity}`, null);
                if (response1.data.status === 200) {
                    console.log('Chưa đăng nhập sản phẩm đã được xóa giỏ hàng thành công:', response1.data);
                    getCart()
                }
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        }
    }
    const handleDelete = async (product) => {
        const isLoggedIn = cookies.get('token')
        if (isLoggedIn) {
            axios.defaults.withCredentials = true
            const responsedelete = await axios.post(`http://localhost:8080/api/client/cart/delete/${product.id}`, null, {
                headers: {
                    'Authorization': `Bearer ${isLoggedIn}`,
                    'Content-Type': 'application/json'
                }
            });
            if (responsedelete.data.status === 200) {
                getCart()
            }
        }
    }
    console.log('arr: ', Arrayproducts)
    return (
        <>
            <Header amount={totalBooks} />
            <div className="cart">
                <div className="container">
                    <div className="cart__header">Giỏ hàng</div>
                    <div className="cart__content">
                        <div className="col-xl-9 col-lg-9 container__cart_left">
                            {Arrayproducts.length > 0 ? Arrayproducts.map((product, index) => (
                                <ul className=" cart__left_content" key={index}>
                                    <li className="cart__content_checkbox">
                                        <input type="checkbox" id={`book-${product.products.idcartitem}`} onChange={handleCheckboxChange} value={product.products.idcartitem}></input>
                                    </li>
                                    <li className="cart__content_pic" style={{ backgroundImage: `url(${Image})` }}></li>
                                    <li className="cart__content_text">
                                        <ul>
                                            <li>{product.products.name}</li>
                                            <li>{product.products.author}</li>
                                            <li><button onClick={() => { handleDelete(product.products) }} >xóa</button></li>
                                        </ul>
                                    </li>
                                    <li className="cart__content_price">{formatCurrency(product.products.price)} / 1 cuốn</li>
                                    <li className="cart__content_button">
                                        <ul className="button__box">
                                            <li className="button button_down">
                                                <button onClick={() => handleSubtract(product.products)}>-</button>
                                            </li>
                                            <li className="amount">
                                                <div>
                                                    {product.products.quantity}
                                                </div>
                                            </li>
                                            <li className="button button_up" >
                                                <button onClick={() => handleAdd(product.products)}>+</button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            )) : <div>Không có sản phẩm trong giỏ hàng</div>}
                        </div>

                        <div className="col-xl-3 col-lg-3 container__cart_right">
                            {Arrayproducts.length !== 0 ?
                                <ul>
                                    <li>{totalBooks} sản phẩm</li>
                                    <li>{formatCurrency(totalPrice)}</li>
                                    <li>(chưa tính phí vận chuyển)</li>
                                    <button onClick={() => handleSubmitOrder()}>Đặt hàng</button>
                                </ul> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default memo(Cart)