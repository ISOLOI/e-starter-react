import { useState } from "react";
import { Cart } from "./Cart";
import { Products } from "./Products";
import "./styles.css";
import { Wishlist } from "./Wishlist";

export default function App() {
  const [route, setRoute] = useState("products");
  return (
    <div className="App mt-1">
      <button
        className={route === "products" ? "btn bg-primary" : "btn bg-secondary"}
        onClick={() => {
          setRoute("products");
        }}
      >
        Products
      </button>
      <button
        className={
          route === "cart" ? "btn bg-primary ml-1" : "btn bg-secondary ml-1"
        }
        onClick={() => {
          setRoute("cart");
        }}
      >
        Cart
      </button>
      <button
        className={
          route === "wishlist" ? "btn bg-primary ml-1" : "btn bg-secondary ml-1"
        }
        onClick={() => {
          setRoute("wishlist");
        }}
      >
        Wishlist
      </button>
      {route === "cart" && <Cart />}
      {route === "products" && <Products setRoute={setRoute} />}
      {route === "wishlist" && <Wishlist setRoute={setRoute} />}
    </div>
  );
}
