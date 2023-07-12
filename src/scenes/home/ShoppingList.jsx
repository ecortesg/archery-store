import { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Product } from "../../components/Product";

export function ShoppingList() {
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [products, setProducts] = useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function getProducts() {
    const products = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/latest-products/`,
      { method: "GET" }
    );
    const productsJson = await products.json();
    setProducts(productsJson);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const bowProducts = products.filter(
    (product) => product.category.name === "Arcos"
  );
  const bowAccesoryProducts = products.filter(
    (product) => product.category.name === "Accesorios para arco"
  );
  const shootingAccesoryProducts = products.filter(
    (product) => product.category.name === "Accesorios de tiro"
  );
  const arrowProducts = products.filter(
    (product) => product.category.name === "Flechas"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Conoce nuestros <b>productos</b>
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
        <Tab label="TODOS" value="all" />
        <Tab label="ARCOS" value="arcos" />
        <Tab label="ACCESORIOS PARA ARCO" value="accesoriosParaArco" />
        <Tab label="ACCESORIOS DE TIRO" value="accesoriosDeTiro" />
        <Tab label="FLECHAS" value="flechas" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          products.map((product) => (
            <Product product={product} key={product.id} />
          ))}

        {value === "arcos" &&
          bowProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))}

        {value === "accesoriosParaArco" &&
          bowAccesoryProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))}

        {value === "accesoriosDeTiro" &&
          shootingAccesoryProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))}

        {value === "flechas" &&
          arrowProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))}
      </Box>
    </Box>
  );
}
