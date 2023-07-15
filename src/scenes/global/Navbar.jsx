import { Badge, Box, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { setIsCartOpen } from "../../state";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [searchInput, setSearchInput] = useState("");

  function handleChange(value) {
    setSearchInput(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: createSearchParams({ query: searchInput }).toString(),
    });
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" }, marginRight: "28px" }}
          color={shades.secondary[500]}
        >
          BOWTIQUE
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="10px"
          zIndex="2"
        >
          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <TextField
              label="Buscar"
              size="small"
              onChange={(e) => handleChange(e.target.value)}
              sx={{ minWidth: 0 }}
            />
            <IconButton type="submit" sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>
          </form>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingCartOutlined />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}
