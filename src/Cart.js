import { useData } from "./data-context";
import { DEC_QTY, INC_QTY, REMOVE_CART_ITEM } from "./data-reducer";

const getAmount = (items) => {
  return items.reduce((total, { price, qty }) => total + price * qty, 0);
};
export function Cart() {
  const { cartItems, dataDispatch } = useData();
  return (
    <>
      <h1>Ye mera Cart</h1>
      <h2> Total: {getAmount(cartItems)}</h2>
      <div
        className="App flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {cartItems.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery,
            qty
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
                    type: REMOVE_CART_ITEM,
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
              <div>
                <button
                  style={{
                    padding: "0.3em 0.5em",
                    fontSize: "1.1rem"
                  }}
                  className="btn btn--icon icon--transparent mb-1 mt-1
                "
                  onClick={() => {
                    dataDispatch({ type: INC_QTY, id });
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
                <span className="ml-sm mr-sm">{qty}</span>
                <button
                  style={{
                    padding: "0.3em 0.5em",
                    fontSize: "1.1rem"
                  }}
                  className="btn btn--icon icon--transparent mb-1 mt-1
                "
                  onClick={() => {
                    dataDispatch({ type: DEC_QTY, id });
                  }}
                >
                  <i className="fa fa-minus"></i>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
