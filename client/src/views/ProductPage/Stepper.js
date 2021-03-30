import React, { useState } from "react";
import { makeStyles, Step, Stepper, StepLabel } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import PaymentMethods from "./PaymentMethods";
import ShippingAddressPage from "./ShippingAddressPage";
import PlaceOrder from "./PlaceOrder";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  layout: {
    width: "100%",
  },
}));

const Steppers = ({ stepValue }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(stepValue || 1);

  const getSteps = () => {
    return ["Sign In", "Shipping", "Payment", "Place order"];
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return;
      case 1:
        return (
          <ShippingAddressPage
            handleNext={handleNext}
            steps={steps}
            activeStep={activeStep}
          />
        );
      case 2:
        return (
          <PaymentMethods
            handleNext={handleNext}
            steps={steps}
            activeStep={activeStep}
          />
        );
      case 3:
        return (
          <PlaceOrder
            handleNext={handleNext}
            steps={steps}
            activeStep={activeStep}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <GridContainer direction="row" alignItems="center" justify="center">
        <GridItem>
          <Stepper className={classes.root} activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </GridItem>
        {getStepContent(activeStep)}
      </GridContainer>
      
    </>
  );
};

export default Steppers;
