import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { DataProvider } from "./data-context";
import { ProductsProvider } from "./products-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductsProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ProductsProvider>
  </StrictMode>,
  rootElement
);
