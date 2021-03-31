import React, { useEffect } from "react";
// react components for routing our app without refresh
import { Link, useNavigate } from "react-router-dom";
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
} from "@material-ui/core";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Progress from "components/Progress/Progress.js";
import Alert from "components/Alert/Alert.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "actions/orderActions";
import { ORDER_CREATE_RESET } from "constants/orderConstants";

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

const PlaceOrder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, navigate]);

  return (
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
                  Name: {cart.shippingAddress.fullName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
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
                  Method: {cart.paymentMethod.paymentMethod}
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
                  {cart.cartItems.map((item) => (
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
                          <Typography className={classes.typo} variant="body1">
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
              Items: {cart.itemsPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="primary" gutterBottom>
              Shipping Address: {cart.shippingPrice}
            </Typography>
            <Typography variant="body2" color="primary" gutterBottom>
              Tax: {cart.taxPrice.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="primary" gutterBottom>
              Order Total: {cart.totalPrice}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={placeOrderHandler}>
              Place Order
            </Button>
          </CardActions>
        </Card>
        <br></br>
        {loading && <Progress></Progress>}
        {error && <Alert severity="error">{error}</Alert>}
      </GridItem>
    </GridContainer>
  );
};

export default PlaceOrder;
