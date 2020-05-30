import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import LoadingFullPage from "./components/common/LoadingFullPage";
const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : (f) => f
//   )
// );

// const userInput = prompt("Please Enter XIO Beta Password");
// if (userInput == process.env.REACT_APP_PASSWORD) {
ReactDOM.render(
  <Provider store={store}>
    <LoadingFullPage />
  </Provider>,
  document.getElementById("root")
);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
