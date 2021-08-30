import { checkItem } from "./utils";
import { useData } from "./data-context";
import {
  ADD_CART_ITEM,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM
} from "./data-reducer";
import { useProducts } from "./products-context";
import {
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  SORT_BY_PRICE
} from "./products-reducer";

const highToLow = "highToLow";
const lowToHigh = "lowToHigh";

const transformProducts = (state) => {
  // sorting
  const sortVal = state[SORT_BY_PRICE];
  let sortedProducts = state.products;
  if (sortVal) {
    sortedProducts = state.products.sort((a, b) =>
      sortVal === highToLow ? b.price - a.price : a.price - b.price
    );
  }
  // filter based on stock
  let filteredProducts = sortedProducts;
  if (!state[INCLUDE_OUT_OF_STOCK]) {
    filteredProducts = sortedProducts.filter((product) => product.inStock);
  }
  //filter based on dilevery
  let finalProducts = filteredProducts;
  if (state[ONLY_FAST_DELIVERY]) {
    finalProducts = filteredProducts.filter(
      (products) => products.fastDelivery
    );
  }
  return finalProducts;
};
export function Products({ setRoute }) {
  const { cartItems, wishlist, dataDispatch } = useData();
  const { productsState, productsDispatch } = useProducts();
  return (
    <>
      <h1>Ye saare Products</h1>
      <div className="m-1">
        Price:
        <input
          checked={productsState[SORT_BY_PRICE] === highToLow}
          type="radio"
          name={SORT_BY_PRICE}
          id={highToLow}
          onChange={() => {
            productsDispatch({
              type: SORT_BY_PRICE,
              value: highToLow
            });
          }}
        />
        <label htmlFor={highToLow}>High to Low</label>
        <input
          checked={productsState[SORT_BY_PRICE] === lowToHigh}
          style={{ marginLeft: "0.5rem" }}
          type="radio"
          name={SORT_BY_PRICE}
          id={lowToHigh}
          onChange={() => {
            productsDispatch({
              type: SORT_BY_PRICE,
              value: lowToHigh
            });
          }}
        />
        <label htmlFor={lowToHigh}>Low to High</label>
      </div>
      <div className="mb-1">
        <input
          type="checkbox"
          checked={productsState[INCLUDE_OUT_OF_STOCK]}
          id={INCLUDE_OUT_OF_STOCK}
          onChange={() => {
            productsDispatch({
              type: INCLUDE_OUT_OF_STOCK
            });
          }}
        />
        <label htmlFor={INCLUDE_OUT_OF_STOCK}>Include Out of Stock</label>
        <input
          style={{ marginLeft: "0.5rem" }}
          type="checkbox"
          checked={productsState[ONLY_FAST_DELIVERY]}
          id={ONLY_FAST_DELIVERY}
          onChange={() => {
            productsDispatch({
              type: ONLY_FAST_DELIVERY
            });
          }}
        />
        <label htmlFor={ONLY_FAST_DELIVERY}>Fast Delivery only</label>
      </div>
      <div
        className="App flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {transformProducts(productsState).map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div key={id} className="card card--shadow m-1">
              <img className="img" src={image} alt={productName} />
              <button
                style={{
                  fontSize: "1.1rem",
                  padding: "0.4em",
                  color: `${checkItem(wishlist, id) ? "red" : "grey"}`,
                  background: "white"
                }}
                className="btn-close btn-lg"
                onClick={() => {
                  checkItem(wishlist, id)
                    ? dataDispatch({
                        type: REMOVE_WISHLIST_ITEM,
                        id
                      })
                    : dataDispatch({
                        type: ADD_WISHLIST_ITEM,
                        item: {
                          id,
                          name,
                          price,
                          inStock,
                          level,
                          fastDelivery,
                          image
                        }
                      });
                }}
              >
                <i className="fa fa-heart"></i>
              </button>
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
              <button
                className="btn bg-primary m-1"
                onClick={() => {
                  checkItem(cartItems, id)
                    ? setRoute("cart")
                    : dataDispatch({
                        type: ADD_CART_ITEM,
                        item: {
                          id,
                          name,
                          price,
                          inStock,
                          level,
                          fastDelivery,
                          image,
                          qty: 1
                        }
                      });
                }}
              >
                {checkItem(cartItems, id) ? "Go to Cart" : "Add to cart"}
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
