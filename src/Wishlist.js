import { useData } from "./data-context";
import { ADD_CART_ITEM, REMOVE_WISHLIST_ITEM } from "./data-reducer";

export function Wishlist({ setRoute }) {
  const { wishlist, dataDispatch } = useData();
  return (
    <>
      <h1> Ye sab mujhe chahiye </h1>
      <div
        className="App flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {wishlist.map(
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
              <img
                className="img"
                src={image}
                width="100%"
                height="auto"
                alt={productName}
              />
              <button
                style={{
                  fontSize: "1.1rem",
                  background: "white"
                }}
                className="btn-close btn-lg"
                onClick={() => {
                  dataDispatch({
                    type: REMOVE_WISHLIST_ITEM,
                    id
                  });
                }}
              >
                <i className="fa fa-times"></i>
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
                  dataDispatch({
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
                  dataDispatch({
                    type: REMOVE_WISHLIST_ITEM,
                    id
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
