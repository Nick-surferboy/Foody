import ReactDOM from "react-dom/client";
import { ContextProvider } from "../src/store/Context";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
