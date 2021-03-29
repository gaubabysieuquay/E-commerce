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
import Stepper from "views/ProductPage/Stepper";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(styles);

const Shipping = (props) => {
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) {
    navigate("/signin");
  }
  const classes = useStyles();
  const { ...rest } = props;
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
        <Stepper />
      </div>
      <Footer />
    </div>
  );
};

export default Shipping;
