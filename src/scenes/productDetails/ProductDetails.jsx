import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { shades } from "../../theme";
import { Product } from "../../components/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state";

export function ProductDetails() {
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  const baseURL = import.meta.env.VITE_BASE_URL;

  async function getProduct() {
    const product = await fetch(`${baseURL}/api/v1/product/${productId}/`, {
      method: "GET",
    });
    const productJson = await product.json();
    setProduct(productJson);
  }

  async function getProducts() {
    const products = await fetch(
      `${baseURL}/api/v1/product/${productId}/related/`,
      {
        method: "GET",
      }
    );
    const productsJson = await products.json();
    setProducts(productsJson);
  }

  useEffect(() => {
    getProduct();
    getProducts();
  }, [location]);

  const { name, description, price, image, category } = product || {};

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
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
            <Typography>${price}</Typography>
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
          {products.slice(0, 6).map((product) => (
            <Product product={product} key={product.uuid} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
