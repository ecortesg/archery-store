import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignupMutation } from "../../api/userApiSlice";

const initialValues = {
  email: "",
  password: "",
  password2: "",
};

const signupSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),
  password2: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export function Signup() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [signup] = useSignupMutation();

  async function createUser(values) {
    try {
      // Exclude password2 from data sent to the backend
      const { password2, ...userData } = values;
      const userDataResponse = await signup(userData).unwrap();
      navigate("/account");
    } catch (err) {
      if (err?.data?.detail) {
        setErrMsg(err.data.detail);
      } else {
        setErrMsg("No server response");
      }
    }
  }

  return (
    <Box
      maxWidth={{ xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "30%" }}
      m="100px auto"
    >
      <Formik
        onSubmit={createUser}
        initialValues={initialValues}
        validationSchema={signupSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box m="30px 0">
              <Box>
                <Typography sx={{ mb: "15px" }} fontSize="18px">
                  Sign Up
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setErrMsg("");
                  }}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setErrMsg("");
                  }}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setErrMsg("");
                  }}
                  value={values.password2}
                  name="password2"
                  error={!!touched.password2 && !!errors.password2}
                  helperText={touched.password2 && errors.password2}
                  sx={{ marginBottom: "15px" }}
                />
              </Box>
              {errMsg && (
                <Box>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errMsg}
                  </Alert>
                </Box>
              )}
            </Box>

            <Box>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: shades.primary[400],
                  boxShadow: "none",
                  color: "white",
                  borderRadius: 0,
                  padding: "15px 40px",
                }}
              >
                SIGN UP
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Typography sx={{ mt: "30px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </Typography>
    </Box>
  );
}
