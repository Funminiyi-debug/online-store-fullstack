import React from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Badge,
} from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Cart } from "../components";
import { Link } from "react-router-dom";

const AppBar2 = ({
  data,
  viewCart,
  noOfItems,
  cartItems,
  deleteItem,
  showCart,
  userLoggedIn,
  logout,
}) => {
  const handleViewCart = () => {
    viewCart(true);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Cart
        show={showCart}
        viewCart={viewCart}
        cartItems={cartItems}
        deleteItem={deleteItem}
      />
      <Navbar.Brand>
        <Link to="/">ShopNow</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleViewCart}>
            <ShoppingCartIcon /> Cart <Badge variant="light">{noOfItems}</Badge>
          </Nav.Link>
          {/* <Nav.Link> */}
          <Link to="/addProduct" style={{ color: "#ddd" }}>
            Add Product
          </Link>
          {/* </Nav.Link> */}
          <NavDropdown title="Categories" id="collasible-nav-dropdown">
            {data.map(category => {
              return (
                <NavDropdown.Item key={category.name.toString()}>
                  <Link to="/">{category.name}</Link>
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
        <Nav>
          <Form inline className="form mr-sm-2">
            <FormControl
              type="text"
              placeholder="Search"
              className="justify-content-end"
            />
          </Form>
          {!userLoggedIn ? (
            <Nav.Link href="/auth/google">Login</Nav.Link>
          ) : (
            <Nav.Link onClick={logout}>Logout </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppBar2;
