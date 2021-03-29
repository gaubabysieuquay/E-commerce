import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Progress from "components/Progress/Progress.js";
import Alert from "components/Alert/Alert.js";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "actions/productActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
});

const SectionProduct = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <GridContainer justify="center" spacing={8}>
      {loading ? (
        <Progress></Progress>
      ) : error ? (
        <GridItem>
          <Alert severity="error">{error}</Alert>
        </GridItem>
      ) : (
        <>
          {products.map((product) => (
            <GridItem key={product.id} xs={12} sm={3} md={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <Link to={`/product/${product.id}`}>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="320"
                      src={require(`assets/img/products/${product.image}`)}
                      title={product.name}
                    />
                  </Link>
                  <CardContent>
                    <Link to={`/product/${product.id}`}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          ))}
        </>
      )}
    </GridContainer>
  );
};

export default SectionProduct;
