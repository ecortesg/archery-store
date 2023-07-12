import { Box, Alert, AlertTitle } from "@mui/material";

export function Confirmation() {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Recibimos tu pedido</AlertTitle>
        Gracias por tu compra
      </Alert>
    </Box>
  );
}
