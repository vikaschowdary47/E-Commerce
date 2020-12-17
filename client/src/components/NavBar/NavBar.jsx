import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import icon from "../../assests/icons8-online-store-96.png";
import "./NavBar.css";
import { GlobalContext } from "../../context/GlobalState";

const NavBar = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const data = useContext(GlobalContext);
  // console.log(data);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    data.Logout();
    console.log(data.state);
  };

  return (
    <div className="nav_bar">
      <AppBar position="fixed" color="inherit" className="app_bar">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={icon} alt="E-commerce" height="40px" className="mr-2" />
            E-Commerce
          </Typography>
          <div className="cart_icon">
            {isAuthenticated ? (
              <>
                <IconButton aria-label="Cart" style={{ padding: 0 }}>
                  <Badge badgeContent="2" color="secondary">
                    <ShoppingCart fontSize="large" />
                  </Badge>
                </IconButton>
              </>
            ) : null}
            <div className="account_button">
              <IconButton onClick={handleClick}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isAuthenticated ? (
                  <div>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={Logout}>Logout</MenuItem>
                  </div>
                ) : (
                  <>
                    <MenuItem onClick={() => history.push("/signup")}>
                      Sign Up
                    </MenuItem>
                    <MenuItem onClick={() => history.push("/login")}>
                      Login
                    </MenuItem>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
