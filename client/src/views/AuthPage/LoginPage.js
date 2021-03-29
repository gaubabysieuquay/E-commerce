import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// @material-ui/core components
import { Icon, InputAdornment, TextField, makeStyles } from "@material-ui/core";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import InfoTypography from "components/Typography/Info.js";
import Progress from "components/Progress/Progress.js";
import Alert from "components/Alert/Alert.js";
//Form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { signin } from "actions/userActions";

const useStyles = makeStyles(styles);

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const LoginPage = (props) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  const redirect = location.search ? location.search.split("=")[1] : "";

  console.log(redirect)

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const dispatch = useDispatch();
  const submitHandler = (values) => {
    dispatch(signin(values.email, values.password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="E-commerce"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <p className={classes.divider}>Let's sign in</p>
                  <CardBody>
                    <TextField
                      label="Email..."
                      id="email"
                      name="email"
                      color="secondary"
                      fullWidth
                      InputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      inputRef={register}
                    />
                    <TextField
                      label="Password"
                      id="password"
                      name="password"
                      color="secondary"
                      fullWidth
                      InputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      inputRef={register}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <GridContainer justify="center">
                      <Button simple color="primary" size="lg" type="submit">
                        Sign in
                      </Button>
                      <InfoTypography>
                        Don't have an account?{" "}
                        <Link
                          to={`/register?redirect=${redirect}`}
                          variant="h6"
                        >
                          Register now
                        </Link>
                      </InfoTypography>
                    </GridContainer>
                  </CardFooter>
                </form>
              </Card>
              {loading && <Progress></Progress>}
              {error && <Alert severity="error">{error}</Alert>}
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default LoginPage;
