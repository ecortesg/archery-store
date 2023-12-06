import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import { AddressForm } from "./AddressForm";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

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
      firstName: yup.string().required("Requerido"),
      lastName: yup.string().required("Requerido"),
      country: yup.string().required("Requerido"),
      street1: yup.string().required("Requerido"),
      street2: yup.string(),
      city: yup.string().required("Requerido"),
      state: yup.string().required("Requerido"),
      zipCode: yup.string().required("Requerido"),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("Requerido").email("Correo inválido"),
    phoneNumber: yup.string().required("Requerido"),
  }),
];

export function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  async function handleFormSubmit(values, actions) {
    setActiveStep(activeStep + 1);

    if (isSecondStep) {
      makePayment(values);
    }

    // Reset validation for the next step
    actions.setTouched({});
  }

  async function makePayment(values) {
    const stripe = await stripePromise;
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

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/order/checkout/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const session = await response.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
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
