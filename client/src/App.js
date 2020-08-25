import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import {
  AppBar,
  Panel,
  Checkout,
  Toaster,
  Login,
  AddProduct,
} from "./components";
import { PrivateRoute } from "./helpers";
import { Skeleton } from "@material-ui/lab";
import { Typography, Container } from "@material-ui/core";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

function App() {
  const api = "http://localhost:2200";
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const noOfItems = cartItems.reduce((a, b) => a + parseInt(b.count), 0);
  const total = cartItems.reduce((a, b) => a + parseInt(b.count * b.price), 0);
  const panelRef = useRef(null);
  const checkoutRef = useRef(null);

  const history = useHistory();
  const location = useLocation();

  // login state
  const [userLoggedIn, setuserLoggedIn] = useState(false);
  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      setuserLoggedIn(false);
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("cartItems");
      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  // end of login

  const getProducts = async () => {
    try {
      const response = await axios.get("/resources/products");
      setproducts(response.data.product);
      setloading(false);
      // console.log(response.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  const getCartItems = async () => {
    try {
      const res = await axios.post("/resources/user/getcartitems", {
        token: localStorage.getItem("jwt"),
      });
      const stringCartItems = localStorage.getItem("cartItems");

      if (stringCartItems !== null) {
        return setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      }
      return setCartItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProducts();
    getCartItems();
    // set log in
    const token = window.localStorage.getItem("jwt");
    if (token !== null) {
      setuserLoggedIn(true);
    } else {
      setuserLoggedIn(false);
    }

    // get user details on login
    const query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);

      history.push("/");
      setuserLoggedIn(true);
    }
  }, []);

  // Toaster
  const [openToaster, setOpenToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("");

  const closeToaster = state => {
    setOpenToaster(false);
  };

  const triggerToaster = (message, type = "success") => {
    setOpenToaster(true);
    setToasterMessage(`${message}`);
    setToasterType(type);
  };
  // end of Toaster

  const viewCart = state => {
    setShowCart(state);
  };

  const addItem = item => {
    const isAvailable = cartItems.find(
      element => element.item === item.item && element.count === item.count
    );

    if (!isAvailable) {
      if (item.count < 1) {
        triggerToaster(`Items cannot be less than one`, "error");
        return;
      } else {
        setCartItems(oldState => [...oldState, item]);
        const count = item.count;
        triggerToaster(
          `${count > 1 ? "items" : "item"} added to cart`,
          "success"
        );
      }
    }
  };

  const deleteItem = item => {
    const others = cartItems.filter(element => element.item !== item.item);

    setCartItems(others);
    const count = item.count;
    triggerToaster(`${count > 1 ? "items" : "item"} deleted`, "error");
  };
  // divide into categories
  const categoryList = [
    "Toiletries",
    "Household",
    "Fresh Foods",
    "Naija Food",
    "Food Cupboard",
  ];

  const categories = categoryList.map(category => {
    return {
      name: category,
      goods: products.filter(element => element.category === category),
    };
  });

  if (loading === true) {
    return (
      <>
        {/* <p>loading</p> */}
        <div style={{ margin: "0 auto" }}>
          <Typography variant="h6" className="text-center">
            Loading...
          </Typography>
          <Skeleton variant="text" width={"80vw"} />
          <Skeleton variant="circle" width={60} height={60} />
          <Skeleton variant="rect" width={"80vw"} height={500} />
        </div>
      </>
    );
  }

  if (loading === false) {
    return (
      <>
        <AppBar
          data={categories}
          viewCart={viewCart}
          noOfItems={noOfItems}
          cartItems={cartItems}
          deleteItem={deleteItem}
          showCart={showCart}
          userLoggedIn={userLoggedIn}
          logout={logout}
        />
        {/* <Container> */}
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/checkout" userLoggedIn={userLoggedIn}>
            <div id="checkout" ref={checkoutRef}>
              <Checkout
                cartItems={cartItems}
                deleteItem={deleteItem}
                total={total}
              ></Checkout>
            </div>
          </PrivateRoute>
          <PrivateRoute path="/addProduct">
            <AddProduct></AddProduct>
          </PrivateRoute>
          <Route path="/">
            <div
              style={{
                width: "90%",
              }}
              id="panel"
              ref={panelRef}
            >
              <Toaster
                open={openToaster}
                message={toasterMessage}
                setOpen={closeToaster}
                type={toasterType}
              ></Toaster>
              {categories.map(category => {
                return (
                  <Panel
                    key={category.name.toString()}
                    title={category.name}
                    data={category.goods}
                    addItem={addItem}
                  ></Panel>
                );
              })}
            </div>
          </Route>
        </Switch>
        {/* </Container> */}
      </>
    );
  }
}

export default App;
