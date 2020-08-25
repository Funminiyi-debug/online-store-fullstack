import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Typography, TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Toaster from "./Toaster";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const mapquesturl = `//open.mapquestapi.com/geocoding/v1/reverse`;

const AddressVerification = ({ cartItems }) => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [inputtedAddress, setInputtedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [openToaster, setOpenToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [error, setError] = useState("");
  const [expanded, setExpanded] = React.useState("panel1");
  const [toasterType, setToasterType] = React.useState("");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(state => {
      return newExpanded ? panel : state;
    });
  };

  const closeToaster = state => {
    setOpenToaster(false);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const triggerToaster = (message, type = "success") => {
    setOpenToaster(true);
    setToasterMessage(`${message}`);
    setToasterType(type);
  };

  const getLocation = async () => {
    const latlng = [];
    let address;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        latlng.push(position.coords);
        try {
          const response = await axios.get(mapquesturl, {
            params: {
              key: ` CGGECfbOdlQvJc8f0SHo1D6yAGVxbtwX `,
              location: `${position.coords.latitude}, ${position.coords.longitude}`,
              includeRoadMetadata: true,
              includeNearestIntersection: true,
            },
          });
          const thisAddress = `${response.data.results[0].locations[0].street} ${response.data.results[0].locations[0].adminArea5} ${response.data.results[0].locations[0].adminArea4} ${response.data.results[0].locations[0].adminArea3} ${response.data.results[0].locations[0].adminArea3Type} ${response.data.results[0].locations[0].adminArea1}`;
          setCurrentAddress(thisAddress);
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      console.log("geolocation not available");
      setError(
        "geolocation not available on your browser. please use chrome or firefox"
      );
    }
    return address;
  };
  const addressRef = useRef(null);
  useEffect(() => {
    getLocation();
    // return () => {
    // };
  }, []);

  return (
    <div className="address-verification">
      <Toaster
        message={toasterMessage}
        open={openToaster}
        setOpen={closeToaster}
        type={toasterType}
      />

      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Current Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            {currentAddress ? (
              <Typography className="py-3" variant="body1">
                You live at {currentAddress}
                <br />
                <Button
                  variant="primary"
                  size="sm"
                  className="mx-2"
                  onClick={() => {
                    setAddress(currentAddress);
                    triggerToaster(`Current Location Added`);
                  }}
                >
                  Use Address
                </Button>
              </Typography>
            ) : error !== "" ? (
              <Typography variant="body1" className="py-3">
                {error}
              </Typography>
            ) : (
              <Typography variant="body1" className="py-3">
                Loading...
              </Typography>
            )}
          </Container>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Add Address</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Row>
              <TextField
                className=""
                id="filled-full-width"
                label="Address"
                style={{ margin: 8 }}
                placeholder="enter your address"
                helperText="delivery address"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                // value=""
                onChange={e => setInputtedAddress(e.target.value.trim())}
              />
            </Row>
            <Row className="">
              {" "}
              <Button
                variant="primary"
                size="sm"
                className="mx-2"
                onClick={() => {
                  if (inputtedAddress !== "") {
                    setAddress(inputtedAddress);
                    triggerToaster(`Address added`);
                  } else {
                    triggerToaster(
                      `You must input an address to add it `,
                      "error"
                    );
                  }
                }}
              >
                Add
              </Button>
            </Row>
          </Container>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Delivery Time and Date</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Row className="">
              <Col>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Col>
              <Col>
                <TextField
                  id="time"
                  label="Time Pickup"
                  // style={{ margin: 8 }}
                  type="time"
                  defaultValue="07:30"
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Col>
            </Row>
            <Row className="my-3">
              <Button variant="primary" size="sm" className="mx-3">
                Schedule
              </Button>
            </Row>
            <Row className="my-3">
              <Typography className="mx-3">
                Goods will be delivered within 3 hours of specified time
              </Typography>
            </Row>
          </Container>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AddressVerification;
