import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import { AddressForm } from "./AddressForm";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCheckoutMutation } from "../../api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const initialValues = {
  shippingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    shippingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      country: yup.string().required("Required"),
      street1: yup.string().required("Required"),
      street2: yup.string(),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      zipCode: yup.string().required("Required"),
    }),
  }),
  yup.object().shape({
    email: yup
      .string()
      .required("Required")
      .email("Please enter a valid email address"),
    phoneNumber: yup.string().required("Required"),
  }),
];

export function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const [checkout, result] = useCheckoutMutation();

  async function handleFormSubmit(values, actions) {
    setActiveStep(activeStep + 1);

    if (isSecondStep) {
      try {
        const requestBody = {
          first_name: values.shippingAddress.firstName,
          last_name: values.shippingAddress.lastName,
          country: values.shippingAddress.country,
          street_1: values.shippingAddress.street1,
          street_2: values.shippingAddress.street2,
          city: values.shippingAddress.city,
          state: values.shippingAddress.state,
          zip_code: values.shippingAddress.zipCode,
          email: values.email,
          phone_number: values.phoneNumber,
          products: cart.map(({ uuid, count }) => ({
            product: uuid,
            count: count,
          })),
        };

        const mutationResult = await checkout(requestBody);
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: mutationResult.data.id });
      } catch (error) {
        console.error("Error occurred during checkout:", error);
      }
    }

    // Reset validation for the next step
    actions.setTouched({});
  }

  if (result.isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (result.isError) {
    return <Typography>{JSON.stringify(result.error)}</Typography>;
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Shipping Address</StepLabel>
        </Step>
        <Step>
          <StepLabel>Contact</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
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
              {isFirstStep && (
                <AddressForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              {isSecondStep && (
                <ContactForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    BACK
                  </Button>
                )}
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
                  {isFirstStep ? "NEXT" : "PLACE ORDER"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
