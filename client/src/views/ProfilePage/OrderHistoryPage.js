import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
} from "@material-ui/core";
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

import styles from "assets/jss/material-kit-react/views/components.js";
import { listOrderMine } from "actions/orderActions";

import { useNavigate } from "react-router";

const useStyles = makeStyles(styles);

const OrderHistoryPage = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  console.log(orders);

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
                <h1 className={classes.title}>Order History</h1>
                <h3 className={classes.subtitle}>A online shop</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        {loading ? (
          <Progress></Progress>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Container>
            <Card>
              <CardHeader title="Order history list" />
              <Divider />
              <TableContainer>
                <Box minWidth={1050}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>PAID</TableCell>
                        <TableCell>DELIVERED</TableCell>
                        <TableCell>ACTIONS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow hover key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
                          <TableCell>
                            {order.isPaid
                              ? order.paidAt.substring(0, 10)
                              : "No"}
                          </TableCell>
                          <TableCell>
                            {order.isDelivered
                              ? order.deliveredAt.substring(0, 10)
                              : "No"}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => navigate(`/order/${order.id}`)}
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
