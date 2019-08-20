import React from "react";
import { render } from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { gameReducer, informationReducer } from "./mutations";
import { GameContainer } from "./containers";
import { logger } from "./middlewares";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { informationEpics } from "./epics";
import "./index.css";

const epic = combineEpics(...informationEpics);
const reducer = combineReducers({
  game: gameReducer,
  information: informationReducer
});
const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, applyMiddleware(logger, epicMiddleware));
epicMiddleware.run(epic);

render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);
