import { memo } from "react"
import {Link} from "react-router-dom"
import { FaFacebookSquare, FaInstagramSquare, FaTelegramPlane } from "react-icons/fa";
import "./styles.scss"
const Footer = () =>{
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="footer__about">
                            <h1 className="footer__about__logo">BookStore</h1>
                            <ul>
                                <li>Địa chỉ: Hẻm 24 Lam Sơn, Thành phố Hồ Chí Minh</li>
                                <li>email: thenghia25022003@gmail.com</li>
                                <li>SDT: 0582132246</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="footer__widget">
                            <h6>Cữa hàng</h6>
                            <ul>
                                <li>
                                    <Link to="">Liên hệ</Link>

                                </li>
                                <li>
                                    <Link to="">Thông tin về chúng tôi</Link>
                                    
                                </li>
                                <li>
                                    <Link to="">Sản phẩm kinh doanh</Link>
                                    
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="">Thông tin tài khoản</Link>

                                </li>
                                <li>
                                    <Link to="">Giỏ hàng</Link>
                                    
                                </li>
                                <li>
                                    <Link to="">Sản phẩm yêu thích</Link>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                        <div className="footer__widget">
                            <h6>Khuyến mãi</h6>
                            <p>Đăng ký nhận thông tin ở đây</p>
                            <form action="">
                                <div className="input-group">
                                    <input type="text" placeholder="Nhập email"/>
                                    <button type="submit" className="button-submit">Đắng ký</button>
                                </div>
                            </form>
                        </div>
                        <div className="footer__widget__social">
                            <div>
                            <FaFacebookSquare />
                            </div>
                            <div>
                            <FaInstagramSquare />
                            </div>
                            <div>
                            <FaTelegramPlane />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </footer>
    )
}
export default memo(Footer)