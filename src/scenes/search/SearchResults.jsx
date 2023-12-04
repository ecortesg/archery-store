import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../../components/Product";
import { Box, Typography, Button } from "@mui/material";

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const query = searchParams.get("query");

  async function fetchProducts(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.results]);
      setNextPage(data.next);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function loadMoreProducts() {
    if (nextPage) {
      fetchProducts(nextPage);
    }
  }

  useEffect(() => {
    setProducts([]);
    const apiUrl = `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/products/search/?page=1&limit=20&query=${query}`;
    fetchProducts(apiUrl);
  }, [searchParams]);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" fontWeight="bold">
        Search
      </Typography>
      <Typography sx={{ marginTop: "25px" }}>
        {`${count} result${count === 1 ? "" : "s"} for "${query}"`}
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
            <Product product={product} key={product.uuid} />
          ))}
        </Box>
        {nextPage && (
          <Box textAlign="center" mt="40px">
            <Button
              variant="contained"
              color="primary"
              onClick={loadMoreProducts}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
