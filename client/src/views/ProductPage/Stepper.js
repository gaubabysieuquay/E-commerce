import React, { useState } from "react";
import { makeStyles, Step, Stepper, StepLabel } from "@material-ui/core";
import ShippingAddressPage from "./ShippingAddressPage";
import GridContainer from "components/Grid/GridContainer";


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
    width: "40%",
    margin: "auto",
  },
}));

const Steppers = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

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
        return "This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };

  return (
    <GridContainer className={classes.layout} direction="row" alignItems="center" justify="center">
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
      {getStepContent(activeStep)}
    </GridContainer>
  );
};

export default Steppers;
