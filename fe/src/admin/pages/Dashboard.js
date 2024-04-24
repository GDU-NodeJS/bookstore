import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Team from "../components/common/Team";
import "../styles/dash.scss";

export default function Dashboard() {
  return (
    <div className="bgcolor">
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Stack spacing={2} direction="row">
                <Card
                  sx={{ minWidth: 49 + "%", height: 150 }}
                  className="gradient"
                >
                  <CardContent>
                    <div className="iconstyles">
                      <CreditCardIcon />
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ color: "#fff" }}
                    >
                      $500.00
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Earnings
                    </Typography>
                  </CardContent>
                </Card>

                <Card
                  sx={{ minWidth: 49 + "%", height: 150 }}
                  className="gradientlight"
                >
                  <CardContent>
                    <div className="iconstyles">
                      <ShoppingBagIcon />
                    </div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ color: "#fff" }}
                    >
                      $900.00
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Order
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack spacing={2}>
                <Card className="gradientlight" sx={{ height: 100 + "%" }}>
                  <Stack spacing={2} direction="row">
                    <div
                      className="iconstyles"
                      style={{ marginLeft: "10px", marginTop: "20px" }}
                    >
                      <StorefrontIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle">$203k</span>
                      <br />
                      <span className="pricesubtitle">Total income</span>
                    </div>
                  </Stack>
                </Card>

                <Card sx={{ height: 100 + "%" }}>
                  <Stack spacing={2} direction="row">
                    <div
                      className="iconstylesblack"
                      style={{ marginLeft: "10px", marginTop: "20px" }}
                    >
                      <StorefrontIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle">$203k</span>
                      <br />
                      <span className="pricesubtitle">Total income</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          <Box height={30} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Card sx={{ height: 400 }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ height: 100 + "%" }}>
                <CardContent>
                  <div className="paddingall">
                    <span className="pricetitle">Các thành viên trong nhóm</span>
                  </div>
                  <Team />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
