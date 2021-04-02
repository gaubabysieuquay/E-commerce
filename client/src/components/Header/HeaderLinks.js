/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Tooltip, Badge } from "@material-ui/core";

// @material-ui/icons
import { Person, ShoppingCart } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "actions/userActions";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/cart/" className={classes.navLink}>
          {cartItems.length > 0 ? (
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCart className={classes.icons} />
            </Badge>
          ) : (
            <ShoppingCart className={classes.icons} />
          )}
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        {userInfo ? (
          <CustomDropdown
            noLiPadding
            buttonText={userInfo.name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={Person}
            dropdownList={[
              <Link to="/orderhistory" className={classes.dropdownLink}>
                Order History
              </Link>,
              <Link
                to="#signout"
                className={classes.dropdownLink}
                onClick={signOutHandler}
              >
                Sign out
              </Link>,
            ]}
          />
        ) : (
          <Link to="/signin" className={classes.navLink}>
            Login
          </Link>
        )}
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
