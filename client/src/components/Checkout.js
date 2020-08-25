import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";

import { Container, Row, Col } from "react-bootstrap";
import {
  CartItems,
  OrderSummary,
  AddressVerification,
  Payment,
} from "../components";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Verify Content Details", "Delivery Location", "Payment"];
}

export default function HorizontalLabelPositionBelowStepper({
  cartItems,
  deleteItem,
  total,
}) {
  const itemsExist = cartItems.length === 0 ? false : true;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [userDetails, setUserDetails] = useState("");
  const [totalDue, setTotalDue] = useState(0);
  const api = "http://localhost:2200";
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getTotal = value => {
    setTotalDue(value);
  };
  const getUserDetails = async () => {
    try {
      const response = await axios.post("/resources/user", {
        token: window.localStorage.getItem("jwt"),
      });
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return itemsExist ? (
          <CartItems cartItems={cartItems} deleteItem={deleteItem} />
        ) : (
          <Typography
            variant="subtitle1"
            className="text-center font-weight-bold"
          >
            No items in Cart yet
          </Typography>
        );
      case 1:
        return <AddressVerification />;
      case 2:
        return (
          <>
            <OrderSummary
              total={total}
              getTotal={getTotal}
              lastPage={true}
              userDetails={userDetails}
              totalDue={totalDue}
            />
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <Container fluid className="my-3">
      <Row>
        <Col>
          <>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <div className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        </Col>
        <Col lg="4" xs="12" className="my-2">
          <OrderSummary total={total} getTotal={getTotal} />
        </Col>
      </Row>
    </Container>
  );
}
