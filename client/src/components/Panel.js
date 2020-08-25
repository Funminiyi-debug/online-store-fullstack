import React from "react";
import Product from "./Product";
import "./Panel.css";
import { Card, CardGroup } from "react-bootstrap";
import { Typography } from "@material-ui/core";

const Panel = ({ title, data, addItem }) => {
  return (
    <Card
      className="text-center"
      border="light"
      key={title.toString()}
      style={{ width: "auto" }}
    >
      <Card.Header className="panel-color">
        <Typography variant="h6" gutterBottom className="panel-header">
          {title}
        </Typography>
      </Card.Header>
      <Card.Body className="panel">
        {data.map(({ name, price, image, _id }) => (
          <CardGroup key={_id.toString()}>
            <Product
              item={name}
              price={price}
              image={image}
              title={title}
              addItem={addItem}
            ></Product>
          </CardGroup>
        ))}
      </Card.Body>
      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
    </Card>
  );
};

export default Panel;
