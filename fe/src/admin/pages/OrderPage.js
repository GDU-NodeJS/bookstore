import Box from "@mui/material/Box";
import React from "react";
import OrderList from "../components/OrderManage/OrderList"

export default function OrderPage() {
  return (
    <div className="bgcolor">
      <Box height={35}/>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Danh sách đơn hàng</h1>
          <OrderList />
        </Box>
      </Box>
    </div>
  );
}
