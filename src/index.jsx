import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Game } from "./components";
import { app } from "./reducers";
import "./index.css";

const store = createStore(app);
ReactDOM.render(<Game />, document.getElementById("root"));
