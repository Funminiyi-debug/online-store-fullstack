import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "react-bootstrap";
import { Avatar, requirePropFactory } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";

const api = "http://localhost:2200";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Cartitems = ({ cartItems, deleteItem }) => {
  // to post cart items once the component is unmounted
  const postCartItems = async () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    try {
      await axios.post(api + "/resources/user/cartItems", {
        userToken: window.localStorage.getItem("jwt"),
        cartItems,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // use effect hook
  useEffect(() => {
    return () => {
      postCartItems();
    };
  }, []);

  const classes = useStyles();
  const handleDeleteItem = item => {
    deleteItem(item);
  };
  // if (cartItems.length !== 0) {
  return (
    <Table striped bordered hover responsive size="sm" className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>No</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className={classes.root}
              >
                {item.image !== undefined && (
                  <Avatar
                    alt={item.item}
                    src={`data:image/${item.image.contentType};base64,  
                     ${Buffer.from(item.image.data).toString("base64")}`}
                    className={classes.large}
                  />
                )}
                {item.item}
                <DeleteForeverIcon
                  className="delete-icon"
                  onClick={() => handleDeleteItem(item)}
                  style={{ justifySelf: "flex-end" }}
                ></DeleteForeverIcon>
              </td>
              <td>#{item.price * item.count}</td>
              <td>{item.count}</td>
            </tr>
          );
        })}
        <tr>
          <td className="font-weight-bold">Total</td>
          <td></td>
          <td className="font-weight-bold">
            #{cartItems.reduce((a, b) => a + b.price * b.count, 0)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
  // } else {
  //   return "";
  // }
};

export default Cartitems;
