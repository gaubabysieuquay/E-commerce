import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useRoutes } from "react-router-dom";
import routes from "routes";

const App = () => {
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const routing = useRoutes(routes(userInfo));

  return <div>{routing}</div>;
};

export default App;
