import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <AppBar position="fixed" color="inherit" className="app_bar">
        <Toolbar>
          <Typography variant="h6">
            <img src="" alt="E-commerce" height="25px" />
            E-Commerce
          </Typography>
          <div className="cart_icon">
            <IconButton aria-label="Cart">
              <Badge badgeContent="2" color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
