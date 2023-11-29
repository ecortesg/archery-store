import { Box, Alert, AlertTitle } from "@mui/material";

export function Confirmation() {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Thank you for your purchase.
      </Alert>
    </Box>
  );
}
