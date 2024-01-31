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
import { setCredentials } from "../../state/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useLoginMutation } from "../../api";

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email"),
  password: yup.string().required("Required"),
});

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [login] = useLoginMutation();

  async function loginUser(values) {
    try {
      const locationState = location.state?.from;
      const userData = await login(values).unwrap();
      const user = jwtDecode(userData.access);
      dispatch(
        setCredentials({ ...userData, user: user.user_id, email: user.email })
      );
      navigate(locationState || "/");
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
        onSubmit={loginUser}
        initialValues={initialValues}
        validationSchema={loginSchema}
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
                  Login
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
                LOGIN
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Typography sx={{ mt: "30px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </Typography>
    </Box>
  );
}
