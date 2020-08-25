import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import { CartItems } from "../components";
import { Link } from "react-router-dom";
const Cart = ({ show, viewCart, cartItems, deleteItem, Checkout }) => {
  const itemsExist = cartItems.length === 0 ? false : true;
  const handleClose = () => viewCart(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemsExist ? (
            <CartItems
              cartItems={cartItems}
              deleteItem={deleteItem}
            ></CartItems>
          ) : (
            <Typography variant="subtitle1">No items in Cart yet</Typography>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Keep Shopping
          </Button>
          <Button variant="success" onClick={handleClose}>
            <Link to="/checkout">Checkout</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
