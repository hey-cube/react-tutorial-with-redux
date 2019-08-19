import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { app } from "./reducers";
import { GameContainer } from "./containers";
import { logger } from "./middlewares";
import "./index.css";

const store = createStore(app, applyMiddleware(logger));

render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);
