import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../../components/Product";
import { Box, Typography } from "@mui/material";

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const products = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/products/search/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchParams.get("query") }),
      }
    );
    const productsJson = await products.json();
    setProducts(productsJson);
  }

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" fontWeight="bold">
        Búsqueda
      </Typography>
      <Typography sx={{ marginTop: "25px" }}>
        {`${products.length} resultado${
          products.length === 1 ? "" : "s"
        } para "${searchParams.get("query")}"`}
      </Typography>
      <Box mt="25px" width="100%">
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
