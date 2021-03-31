import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link, useParams, useNavigate } from "react-router-dom";
// @material-ui/core components
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Progress from "components/Progress/Progress.js";
import Alert from "components/Alert/Alert.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "actions/orderActions";

const useStyles = makeStyles({
  ...styles,
  card: {
    width: "100%",
  },
  media: {
    maxWidth: "5rem",
  },
  typo: {
    minWidth: "30rem",
  },
});

const Order = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  console.log(order.orderItems)

  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [id, dispatch]);

  return loading ? (
    <Progress></Progress>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <div>
      <Header
        brand="E-commerce"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Material Kit React.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Typography variant="h2">Order {order.id}</Typography>
        <GridContainer spacing={8}>
          <GridItem xs={12} sm={8} md={8}>
            <List component="ul" aria-label="place order">
              <ListItem>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" color="primary" gutterBottom>
                      Shipping
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Name: {order.shippingAddress.fullName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Address: {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
              <ListItem>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" color="primary" gutterBottom>
                      Payment
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Method: {order.paymentMethod.paymentMethod}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
              <ListItem>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" color="primary" gutterBottom>
                      Order Items
                    </Typography>
                    <List component="ul" aria-label="cart">
                      {order.orderItems.map((item) => (
                        <ListItem key={item.product}>
                          <GridContainer
                            direction="row"
                            alignItems="center"
                            justify="center"
                          >
                            <GridItem xs={12} sm={4} md={4}>
                              <Card className={classes.media}>
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    alt={item.name}
                                    height="auto"
                                    src={require(`assets/img/products/${item.image}`)}
                                    title={item.name}
                                  />
                                </CardActionArea>
                              </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <Typography
                                className={classes.typo}
                                variant="body1"
                              >
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Typography>
                            </GridItem>
                            <GridItem xs={12} sm={2} md={2}>
                              <Typography variant="body1">
                                {item.qty} x {item.price} VND
                              </Typography>
                            </GridItem>
                          </GridContainer>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body2" color="primary" gutterBottom>
                  Items: {order.itemsPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="primary" gutterBottom>
                  Shipping Address: {order.shippingPrice}
                </Typography>
                <Typography variant="body2" color="primary" gutterBottom>
                  Tax: {order.taxPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="primary" gutterBottom>
                  Order Total: {order.totalPrice}
                </Typography>
              </CardContent>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
