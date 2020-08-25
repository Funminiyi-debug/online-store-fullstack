import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Divider, Button, TextField, Typography } from "@material-ui/core";
import "./Panel.css";

const Product = ({ item, price, image, title, addItem }) => {
  const [add, setAdd] = useState(false);
  const [numberPurchased, setNumberPurchased] = useState(0);
  const toggleCart = () => {
    setAdd(true);
    setNumberPurchased(1);
  };
  const handleBlur = e => {
    setAdd(false);
    setNumberPurchased(e.target.value);
    const purchase = {
      title,
      item,
      price,
      image,
      count: e.target.value || numberPurchased,
    };

    addItem(purchase);
  };

  return (
    <>
      <Card
        style={{
          margin: "1rem",
        }}
        key={item.toString()}
      >
        <Card.Img
          variant="top"
          src={`data:image/${image.contentType};base64,  
          ${Buffer.from(image.data).toString("base64")}`}
          style={{
            width: "80%",
            margin: " auto",
            height: "150px",
          }}
        />
        <Divider></Divider>
        <Card.Body>
          <Typography variant="body1" display="block" gutterBottom>
            {item}
          </Typography>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>
            <Typography variant="overline" display="block">
              Price: #{price}
            </Typography>
          </ListGroupItem>
          {!add && (
            <ListGroupItem style={{ margin: "0 auto", border: "none" }}>
              <Button variant="contained" onClick={toggleCart}>
                Add to Cart
              </Button>
            </ListGroupItem>
          )}
          {add && (
            <ListGroupItem style={{ margin: "0 auto", border: "none" }}>
              <TextField
                onBlur={handleBlur}
                id="outlined-number"
                label="Number"
                type="number"
                autoFocus
                defaultValue={1}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </ListGroupItem>
          )}{" "}
        </ListGroup>
      </Card>
    </>
  );
};

export default Product;
