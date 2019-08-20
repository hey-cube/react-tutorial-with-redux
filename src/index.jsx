import React from "react";
import { render } from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { gameReducer } from "./mutations";
import { GameContainer } from "./containers";
import { logger } from "./middlewares";
import "./index.css";

const app = combineReducers({ game: gameReducer });
const store = createStore(app, applyMiddleware(logger));

render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);
