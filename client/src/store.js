import { cartReducer } from "reducer/cartReducer";
import {
  orderDetailsReducer,
  orderCreateReducer,
  orderMineListReducer,
} from "reducer/orderReducer";
import {
  productListReducer,
  productDetailsReducer,
} from "reducer/productReducers";
import {
  userSignInReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "reducer/userReducer";
import { compose, applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod"),
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
