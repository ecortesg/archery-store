import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { shades } from "../../theme";
import { Product } from "../../components/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cartSlice";
import {
  useProductDetailsQuery,
  useRelatedProductsQuery,
} from "../../api/productApiSlice";

export function ProductDetails() {
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProductDetailsQuery(productId);

  const {
    data: relatedProducts,
    isLoading: isRelatedProductsLoading,
    isError: isRelatedProductsError,
  } = useRelatedProductsQuery(productId);

  const {
    name,
    description,
    price,
    discount,
    discounted_price,
    image,
    category,
  } = product || {};

  if (isProductLoading || isRelatedProductsLoading) {
    return <p>Loading...</p>;
  }

  if (isProductError || isRelatedProductsError) {
    return <p>Error loading data</p>;
  }

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px" height="550px">
          <img
            alt={name}
            width="100%"
            height="100%"
            src={image}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{name}</Typography>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" style={{ fontSize: "1.2em" }}>
                ${discounted_price}
              </Typography>
              {discount !== "0.00" && (
                <Typography
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                  }}
                >
                  ${price}
                </Typography>
              )}
            </Box>
            <Typography sx={{ mt: "20px" }}>{description}</Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
                "&:hover": { backgroundColor: shades.primary[500] },
              }}
              onClick={() => {
                dispatch(addToCart({ product: { ...product, count } }));
                setCount(1);
              }}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <Typography>CATEGORIES: {category?.name}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          RELATED PRODUCTS
        </Typography>
        <Box
          margin="20px auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {relatedProducts.slice(0, 6).map((product) => (
            <Product product={product} key={product.uuid} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
