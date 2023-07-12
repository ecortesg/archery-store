import { Box, Typography, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";

export function AddressForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
}) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  function formattedName(field) {
    return `shippingAddress.${field}`;
  }

  function formattedError(field) {
    return Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );
  }

  function formattedHelper(field) {
    return (
      getIn(touched, formattedName(field)) &&
      getIn(errors, formattedName(field))
    );
  }

  return (
    <Box m="30px auto">
      {/* SHIPPING FORM */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Dirección de envío
        </Typography>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          <TextField
            fullWidth
            type="text"
            label="Nombre"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.firstName}
            name={formattedName("firstName")}
            error={formattedError("firstName")}
            helperText={formattedHelper("firstName")}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Apellido"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.lastName}
            name={formattedName("lastName")}
            error={formattedError("lastName")}
            helperText={formattedHelper("lastName")}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="País"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.country}
            name={formattedName("country")}
            error={formattedError("country")}
            helperText={formattedHelper("country")}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Dirección 1"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.street1}
            name={formattedName("street1")}
            error={formattedError("street1")}
            helperText={formattedHelper("street1")}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Dirección 2"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.street2}
            name={formattedName("street2")}
            error={formattedError("street2")}
            helperText={formattedHelper("street2")}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Ciudad"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.city}
            name={formattedName("city")}
            error={formattedError("city")}
            helperText={formattedHelper("city")}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Estado"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.state}
            name={formattedName("state")}
            error={formattedError("state")}
            helperText={formattedHelper("state")}
            sx={{ gridColumn: "1fr" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Código postal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress.zipCode}
            name={formattedName("zipCode")}
            error={formattedError("zipCode")}
            helperText={formattedHelper("zipCode")}
            sx={{ gridColumn: "1fr" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
