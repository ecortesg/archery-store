import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

export function Product({ product, width }) {
  const navigate = useNavigate();

  const {
    palette: { neutral },
  } = useTheme();

  const { name, get_absolute_url, price, get_thumbnail, category } =
    product || {};

  return (
    <Box width={width}>
      <Box>
        <img
          alt={name}
          width="300px"
          height="200px"
          src={get_thumbnail}
          onClick={() => navigate(`/products${get_absolute_url}`)}
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
