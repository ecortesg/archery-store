import { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Product } from "../../components/Product";
import { client } from "../../api";

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
    const productsResponse = await client.get("api/v1/product/best-sellers/");
    const products = await productsResponse.data;
    setProductsBestSellers(products);
  }

  async function getProductsNewArrivals() {
    const productsResponse = await client.get("api/v1/product/new-arrivals/");
    const products = await productsResponse.data;
    setProductsNewArrivals(products);
  }

  async function getProductsOnSale() {
    const productsResponse = await client.get("api/v1/product/on-sale/");
    const products = await productsResponse.data;
    setProductsOnSale(products);
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
