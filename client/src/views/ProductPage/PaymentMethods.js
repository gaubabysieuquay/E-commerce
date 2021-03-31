import React from "react";
import { useDispatch } from "react-redux";
//@material-ui/core
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
//React-hook-form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { savePaymentMethod } from "actions/cartActions";
import GridContainer from "components/Grid/GridContainer";

const schema = yup.object().shape({
  paymentMethod: yup.string().required("Required"),
});

const PaymentMethods = ({ activeStep, steps, handleNext }) => {
  const dispatch = useDispatch();

  const initialFormState = {
    paymentMethod: "",
  };

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState,
  });

  const onSubmit = (values) => {
    dispatch(savePaymentMethod(values.paymentMethod));
    handleNext();
  };

  return (
    <GridContainer alignItems="center" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={Boolean(errors.paymentMethod)} component="fieldset">
          <FormLabel component="legend">Payment Methods </FormLabel>
          <Controller
            as={
              <RadioGroup aria-label="Payment Method" ref={register}>
                <FormControlLabel
                  value="Paypal"
                  control={<Radio />}
                  label="Paypal"
                />
                <FormControlLabel
                  value="Stripe"
                  control={<Radio />}
                  label="Stripe"
                />
              </RadioGroup>
            }
            name="paymentMethod"
            control={control}
          />
          <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
        </FormControl>
        <Button fullWidth variant="contained" type="submit">
          {activeStep === steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </form>
    </GridContainer>
  );
};
export default PaymentMethods;
