import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../state/authSlice";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { selectCurrentUserEmail } from "../../state/authSlice";
import { OrdersTable } from "./OrdersTable";

export function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector(selectCurrentUserEmail);

  function logoutUser() {
    dispatch(logOut());
    navigate("/");
  }

  return (
    <Box width="80%" m="100px auto">
      <Typography sx={{ mb: "15px" }} fontSize="18px">
        My Account
      </Typography>
      <Typography sx={{ mb: "15px" }}>{email}</Typography>
      <Button
        onClick={() => logoutUser()}
        type="submit"
        color="error"
        variant="contained"
        sx={{
          backgroundColor: shades.secondary[400],
          boxShadow: "none",
          color: "white",
          borderRadius: 0,
          padding: "15px 40px",
          marginBottom: "15px",
        }}
      >
        LOGOUT
      </Button>
      <Typography fontSize="15px">My Orders</Typography>
      <OrdersTable />
    </Box>
  );
}
