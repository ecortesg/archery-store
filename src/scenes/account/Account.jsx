import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOut } from "../../state/authSlice";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useAccountQuery } from "../../api";

export function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: account, isLoading, isError, error } = useAccountQuery();

  function logoutUser() {
    dispatch(logOut());
    navigate("/");
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  return (
    <Box width="80%" m="100px auto">
      <Typography sx={{ mb: "15px" }} fontSize="18px">
        My Account
      </Typography>
      <Typography sx={{ mb: "15px" }}>{account.user.email}</Typography>
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
        }}
      >
        LOGOUT
      </Button>
    </Box>
  );
}
