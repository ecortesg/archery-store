import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { shades } from "../../theme";
import { Product } from "../../components/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cartSlice";
import { useProductDetailsQuery } from "../../api";

export function ProductDetails() {
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useProductDetailsQuery(productId);

  const { details, related_products } = data || {};

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px" height="550px">
          <img
            alt={details.name}
            width="100%"
            height="100%"
            src={details.image}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{details.name}</Typography>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" style={{ fontSize: "1.2em" }}>
                ${details.discounted_price}
              </Typography>
              {details.discount !== "0.00" && (
                <Typography
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                  }}
                >
                  ${details.price}
                </Typography>
              )}
            </Box>
            <Typography sx={{ mt: "20px" }}>{details.description}</Typography>
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
                dispatch(addToCart({ product: { ...details, count } }));
                setCount(1);
              }}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <Typography>CATEGORIES: {details.category.name}</Typography>
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
          {related_products.slice(0, 6).map((product) => (
            <Product product={product} key={product.uuid} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
