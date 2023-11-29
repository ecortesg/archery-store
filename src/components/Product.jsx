import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

export function Product({ product, width }) {
  const navigate = useNavigate();

  const {
    palette: { neutral },
  } = useTheme();

  const { uuid, name, get_absolute_url, price, image, category } =
    product || {};

  return (
    <Box width={width}>
      <Box>
        <img
          alt={name}
          width="300px"
          height="200px"
          src={image}
          onClick={() => navigate(`/products${get_absolute_url}/`)}
          style={{ cursor: "pointer", objectFit: "contain" }}
        />
      </Box>
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category.name}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
}
