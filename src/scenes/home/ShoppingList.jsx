import { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Product } from "../../components/Product";

export function ShoppingList() {
  const [value, setValue] = useState("best-sellers");
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [productsBestSellers, setProductsBestSellers] = useState([]);
  const [productsNewArrivals, setProductsNewArrivals] = useState([]);
  const [productsOnSale, setProductsOnSale] = useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function getProductsBestSellers() {
    const products = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/product/best-sellers/`,
      { method: "GET" }
    );
    const productsJson = await products.json();
    setProductsBestSellers(productsJson);
  }

  async function getProductsNewArrivals() {
    const products = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/product/new-arrivals/`,
      { method: "GET" }
    );
    const productsJson = await products.json();
    setProductsNewArrivals(productsJson);
  }

  async function getProductsOnSale() {
    const products = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/product/on-sale/`,
      { method: "GET" }
    );
    const productsJson = await products.json();
    setProductsOnSale(productsJson);
  }

  useEffect(() => {
    getProductsBestSellers();
    getProductsNewArrivals();
    getProductsOnSale();
  }, []);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{ m: "25px", "& .MuiTabs-flexContainer": { flexWrap: "wrap" } }}
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
        {value === "new-arrivals" &&
          productsNewArrivals.map((product) => (
            <Product product={product} key={product.uuid} />
          ))}

        {value === "best-sellers" &&
          productsBestSellers.map((product) => (
            <Product product={product} key={product.uuid} />
          ))}

        {value === "on-sale" &&
          productsOnSale.map((product) => (
            <Product product={product} key={product.uuid} />
          ))}
      </Box>
    </Box>
  );
}
