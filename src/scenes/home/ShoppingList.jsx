import { useState } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Product } from "../../components/Product";

export function ShoppingList({ newArrivals, bestSellers, saleItems }) {
  const [tab, setTab] = useState("best-sellers");
  const isNonMobile = useMediaQuery("(min-width:600px");

  function handleChange(event, newValue) {
    setTab(newValue);
  }

  function renderProducts(selectedValue, tabName, data) {
    if (selectedValue !== tabName) return null;

    return data.map((product) => (
      <Product product={product} key={product.uuid} />
    ));
  }

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={tab}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{ m: "25px" }}
        variant={isNonMobile ? "standard" : "fullWidth"}
      >
        <Tab label="New Arrivals" value="new-arrivals" />
        <Tab label="Best Sellers" value="best-sellers" />
        <Tab label="Sale Items" value="on-sale" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {renderProducts(tab, "new-arrivals", newArrivals)}
        {renderProducts(tab, "best-sellers", bestSellers)}
        {renderProducts(tab, "on-sale", saleItems)}
      </Box>
    </Box>
  );
}
