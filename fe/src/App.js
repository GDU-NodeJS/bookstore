// import React, { useEffect, useState } from "react";
// import RouterCustom from "./router.js";
// import LoginPage from "../src/pages/login/login.js";
// import Cookies from "universal-cookie";
// const App = () => {
//     const [role, setRole] = useState('');
//     const cookies = new Cookies()
//     // Hàm này sẽ được gọi khi component được tải lần đầu tiên
//     useEffect(() => {
//         const userRole = cookies.get('userRole');
//         if (userRole) {
//             setRole(userRole); // Nếu có vai trò từ cookie, cập nhật state
//         }
//     }, []); // Tham số thứ hai truyền vào useEffect là một mảng rỗng, đảm bảo hàm chỉ được gọi một lần

//     return (
//         <div>
//             {/* Kiểm tra xem có vai trò hay không */}
//             {<RouterCustom role={role} />}
//         </div>
//     );
// };

// export default App;


import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;