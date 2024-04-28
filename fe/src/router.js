import { Routes, Route,Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HomePage from "./pages/users/homePage";
import { ROUTER } from "./utils/router";
import Cart from "./pages/users/cart";
import Findpage from "./pages/users/findpage";
import Bookdetail from "./pages/users/bookdetail";
import LoginPage from "./pages/login/login";
import Account from "./pages/account";
import Createorder from "./pages/createorder";
import RegisterForm from "./pages/register/register.js";
import Admin from "./admin/admin.js";

const renderUserRouter = ({ role }) => {
    const userRouter = [
        {
            path: ROUTER.USER.HOME,
            Comment: <HomePage />
        },
        {
            path: ROUTER.USER.CART,
            Comment: <Cart />
        },
        {
            path: ROUTER.USER.FIND,
            Comment: <Findpage />
        },
        {
            path: ROUTER.USER.DETAIL,
            Comment: <Bookdetail />
        },
        {
            path: ROUTER.USER.ACCOUNT,
            Comment: <Account/>
        },
        {
            path: ROUTER.USER.CREATEORDER,
            Comment: <Createorder/>
        }
    ];

    const adminRouter = [
        {
            path: ROUTER.ADMIN.HOME,
            Comment: <Admin />
        }
    ];
    
    return (
        <>
            {role === 'Admin' ? (
                <Routes>
                    {adminRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.Comment} />
                    ))}
                </Routes>
            ) : (
                    <Routes>
                        {userRouter.map((item, key) => (
                            <Route key={key} path={item.path} element={item.Comment} />
                        ))}
                        <Route path={ROUTER.AUTHEN.LOGIN} element={<LoginPage/>}/>
                        <Route path={ROUTER.REGISTER.REGISTER} element={<RegisterForm/>}/>

                    </Routes>
                
            )}
        </>
    );
};

const RouterCustom = ({role}) => {
    return (
             renderUserRouter({ role })
    );
};

export default RouterCustom;
