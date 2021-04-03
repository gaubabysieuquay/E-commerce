import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, TextField, Typography } from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Progress from "components/Progress/Progress.js";
import Alert from "components/Alert/Alert.js";
//Form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "actions/userActions";

const useStyles = makeStyles(styles);

const schema = Yup.object().shape({
  name: Yup.string().max(255).required("Username is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const { handleSubmit, errors, register, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const name = getValues("name");
  const email = getValues("email");
  const password = getValues("password");
  const confirmPassword = getValues("confirmPassword");
  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo.id));
    } else {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [dispatch, userInfo.id, user]);

  const submitHandler = (e) => {
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(
        updateUserProfile({
          userId: user.id,
          name,
          email,
          password,
        })
      );
    }
  };
  return (
    <div>
      <Header
        color="transparent"
        brand="E-commerce"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer direction="row" justify="center">
            <Typography gutterBottom variant="h5" component="h2">
              USER PROFILE
            </Typography>
          </GridContainer>
          <GridContainer direction="row" justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(submitHandler)}
                >
                  {loading ? (
                    <Progress></Progress>
                  ) : error ? (
                    <Alert severity="error">{error}</Alert>
                  ) : (
                    <>
                      {loadingUpdate && <Progress></Progress>}
                      {errorUpdate && (
                        <Alert severity="error">{errorUpdate}</Alert>
                      )}
                      {successUpdate && (
                        <Alert severity="success">
                          Profile Updated Successfully
                        </Alert>
                      )}
                      <div>
                        <TextField
                          label="Username"
                          id="name"
                          name="name"
                          color="secondary"
                          fullWidth
                          error={Boolean(errors.name)}
                          helperText={errors.name?.message}
                          defaultValue={user.name}
                          inputRef={register}
                        />
                        <TextField
                          label="Email..."
                          id="email"
                          name="email"
                          color="secondary"
                          fullWidth
                          InputProps={{
                            type: "email",
                          }}
                          error={Boolean(errors.email)}
                          helperText={errors.email?.message}
                          defaultValue={user.email}
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
                            autoComplete: "off",
                          }}
                          error={Boolean(errors.password)}
                          helperText={errors.password?.message}
                          inputRef={register}
                        />
                        <TextField
                          label="Confirm Password"
                          id="confirmPassword"
                          name="confirmPassword"
                          color="secondary"
                          fullWidth
                          InputProps={{
                            type: "password",
                            autoComplete: "off",
                          }}
                          error={Boolean(errors.password)}
                          helperText={errors.password?.message}
                          inputRef={register}
                        />
                      </div>
                    </>
                  )}
                  <Button simple color="primary" size="lg" type="submit">
                    Update
                  </Button>
                </form>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
