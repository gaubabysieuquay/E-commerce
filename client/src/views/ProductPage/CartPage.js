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
import { addToCart, removeFromCart  } from "actions/cartActions";

const useStyles = makeStyles({
  ...styles,
  root: {
    maxWidth: "5rem",
  },
  typo: {
    minWidth: "30rem",
  },
});

const CartPage = (props) => {
  const classes = useStyles();
  const { ...rest } = props;

  const { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=shipping");
  };
  return (
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
        <GridContainer spacing={8}>
          <GridItem xs={12} sm={8} md={8}>
            {cartItems.length === 0 ? (
              <Alert severity="error">
                Cart is empty. <Link to="/">Go shopping</Link>
              </Alert>
            ) : (
              <List component="ul" aria-label="cart">
                {cartItems.map((item) => (
                  <ListItem key={item.product}>
                    <GridContainer
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <GridItem xs={12} sm={3} md={3}>
                        <Card className={classes.root}>
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
                      <GridItem xs={12} sm={3} md={3}>
                        <Typography className={classes.typo} variant="body1">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Typography>
                      </GridItem>
                      <GridItem xs={12} sm={2} md={2}>
                        <TextField
                          id={`product-${item.id}`}
                          label="Qty"
                          variant="outlined"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2} md={2}>
                        <Typography variant="body1">
                          {item.price} VND
                        </Typography>
                      </GridItem>
                      <GridItem xs={12} sm={2} md={2}>
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </ListItem>
                ))}
              </List>
            )}
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Basket totals
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :{" "}
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} VND
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};
export default CartPage;
