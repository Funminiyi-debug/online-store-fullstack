import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "react-bootstrap";

const Payment = ({ userDetails, total }) => {
  const config = {
    reference: new Date().getTime(),
    amount: parseInt(total) * 100,
    publicKey: "pk_test_15277e7e5fcea542f39442e2d11af716103f4a11",
  };
  if (userDetails !== undefined) {
    config.email = userDetails.email;
    config.firstname = userDetails.firstName;
    config.lastname = userDetails.lastName;
  }

  const initializePayment = usePaystackPayment(config);
  const handleClick = () => {
    initializePayment();
  };
  return (
    <>
      <div>
        <Button className=" btn btn-success" onClick={handleClick}>
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default Payment;
