import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "store";
import "styles/index.scss";
import "./index.css";
// const rootElement = document.createElement("div");
// rootElement.id = "react-chrome-app";
// document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
