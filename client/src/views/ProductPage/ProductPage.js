import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { useParams, useNavigate } from "react-router-dom";
// @material-ui/core components
import {
  Card,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  Typography,
  makeStyles,
  colors,
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
import Progress from "components/Progress/Progress.js";
import Alert from "components/Alert/Alert.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "actions/productActions";

const useStyles = makeStyles(styles);

const ProductPage = (props) => {
  const classes = useStyles();
  const { ...rest } = props;

  const [qty, setQty] = useState(1);
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
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
          {loading ? (
            <Progress></Progress>
          ) : error ? (
            <GridItem>
              <Alert severity="error">{error}</Alert>
            </GridItem>
          ) : (
            <>
              <GridItem xs={12} sm={6} md={6}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="auto"
                      src={require(`assets/img/products/${product.image}`)}
                      title={product.name}
                    />
                  </CardActionArea>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <List component="ul" aria-label="product information">
                  <ListItem>
                    <Typography variant="h6">{product.author}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="h4" color="initial">
                      {product.name}
                    </Typography>
                  </ListItem>
                  <ListItem>Price: {product.price}</ListItem>
                  <ListItem>Description: {product.description}</ListItem>
                  <ListItem>
                    Status:
                    {product.countInStock > 0 ? (
                      <Typography style={{ color: colors.lightGreen[500] }}>
                        In stock
                      </Typography>
                    ) : (
                      <Typography style={{ color: colors.red[500] }}>
                        Out of stock
                      </Typography>
                    )}
                  </ListItem>

                  {product.countInStock > 0 && (
                    <>
                      <ListItem>
                        <TextField
                          id={`product-${product.id}`}
                          label="Qty"
                          variant="outlined"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        />
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={addToCartHandler}
                        >
                          Add to cart
                        </Button>
                      </ListItem>
                    </>
                  )}
                </List>
              </GridItem>
            </>
          )}
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};
export default ProductPage;
