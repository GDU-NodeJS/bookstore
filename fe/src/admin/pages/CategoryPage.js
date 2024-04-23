import Box from "@mui/material/Box";
import React from "react";
import CategoryList from "../components/CategoryManage/CategoryList"

export default function CategoryPage() {
  return (
    <div className="bgcolor">
      <Box height={36} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Danh sách thể loại</h1>
          <CategoryList/>
        </Box>
      </Box>
    </div>
  );
}
