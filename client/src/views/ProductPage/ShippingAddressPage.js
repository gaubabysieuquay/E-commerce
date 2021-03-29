import React from "react";
import { useDispatch, useSelector } from "react-redux";
//@material-ui/core
import { TextField, Button } from "@material-ui/core";
//React-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { saveShippingAddress } from "actions/cartActions";

const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup
    .number()
    .typeError("Must be number")
    .required("Postal code is required"),
  country: yup.string().required("Country is required"),
  location: yup.string().required("Location is required"),
});

const ShippingAddressPage = ({ activeStep, steps, handleNext }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const initialFormState = {
    fullName: shippingAddress.fullName,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
    location: shippingAddress.location,
  };
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState,
  });

  const onSubmit = (values) => {
    dispatch(saveShippingAddress(values));
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        fullWidth
        label="Full Name"
        type="text"
        name="fullName"
        margin="normal"
        error={Boolean(errors.fullName)}
        helperText={errors.fullName?.message}
        inputRef={register}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Address"
        type="text"
        name="address"
        margin="normal"
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
        inputRef={register}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="City"
        type="text"
        name="city"
        margin="normal"
        error={Boolean(errors.city)}
        helperText={errors.city?.message}
        inputRef={register}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Postal code"
        type="text"
        name="postalCode"
        margin="normal"
        error={Boolean(errors.postalCode)}
        helperText={errors.postalCode?.message}
        inputRef={register}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Country"
        type="text"
        name="country"
        margin="normal"
        error={Boolean(errors.country)}
        helperText={errors.country?.message}
        inputRef={register}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Location"
        type="text"
        name="location"
        margin="normal"
        error={Boolean(errors.location)}
        helperText={errors.location?.message}
        inputRef={register}
      />
      <Button fullWidth variant="contained" type="submit">
        {activeStep === steps.length - 1 ? "Finish" : "Countinue"}
      </Button>
    </form>
  );
};
export default ShippingAddressPage;
