import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
// @material-ui/core components
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  List,
  ListItem,
  Typography,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Alert from "components/Alert/Alert.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  ...styles,
  root: {
    width: "100%",
  },
  typo: {
    minWidth: "30rem",
  },
});

const PlaceOrder = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);

  return (
    <GridContainer>
      <GridItem xs={12} sm={8} md={8}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Shipping
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Name: {cart.shippingAddress.fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Address: {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </Typography>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Basket totals
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Subtotal
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">PROCEED TO CHECKOUT</Button>
          </CardActions>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default PlaceOrder;
