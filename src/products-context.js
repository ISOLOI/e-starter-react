import { createContext, useContext, useReducer } from "react";
import {
  productsReducer,
  products,
  FILTER_BY_STOCK,
  ONLY_FAST_DELIVERY
} from "./products-reducer";

const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products,
    [FILTER_BY_STOCK]: true,
    [ONLY_FAST_DELIVERY]: false
  });
  return (
    <ProductsContext.Provider
      value={{
        productsState: state,
        productsDispatch: dispatch
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
