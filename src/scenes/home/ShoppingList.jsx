import { useState } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Product } from "../../components/Product";
import {
  useBestSellersQuery,
  useNewArrivalsQuery,
  useSaleItemsQuery,
} from "../../api/productApiSlice";

export function ShoppingList() {
  const [tab, setTab] = useState("best-sellers");
  const isNonMobile = useMediaQuery("(min-width:600px");

  const bestSellersQuery = useBestSellersQuery();
  const newArrivalsQuery = useNewArrivalsQuery();
  const saleItemsQuery = useSaleItemsQuery();

  function handleChange(event, newValue) {
    setTab(newValue);
  }

  function renderProducts(selectedValue, query, tabName) {
    if (selectedValue !== tabName) return null;

    const { isLoading, isError, error, isSuccess, data } = query;

    if (isLoading) {
      return <Typography>Loading...</Typography>;
    } else if (isError) {
      return <Typography>{JSON.stringify(error)}</Typography>;
    } else if (isSuccess && data) {
      return data.map((product) => (
        <Product product={product} key={product.uuid} />
      ));
    }

    return null;
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
        {renderProducts(tab, newArrivalsQuery, "new-arrivals")}
        {renderProducts(tab, bestSellersQuery, "best-sellers")}
        {renderProducts(tab, saleItemsQuery, "on-sale")}
      </Box>
    </Box>
  );
}
