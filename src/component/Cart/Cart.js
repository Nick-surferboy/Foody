import { useContext, useState } from "react";
import classes from "./Cart.module.css";

import Context from "../../store/Context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(Context);
  const totalAmount = `$${ctx.myCartTotalAmount.toFixed(2)}`;
  const [isCheckoutDisplayed, setIsCheckoutDisplayed] = useState(false);

  const cartItemAddHandler = (item) => {
    ctx.onAddToCart({
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price,
    });
  };

  const cartItemRemoveHandler = (item) => {
    ctx.onRemoveFromCart({
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price,
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.myCart.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            price={item.price}
            amount={item.amount}
            name={item.name}
            onRemove={cartItemRemoveHandler.bind(null, item)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const onDisplayCheckoutHandler = () => {
    setIsCheckoutDisplayed(!isCheckoutDisplayed);
  };

  return (
    <>
      {ctx.myCart.length > 0 ? cartItems : <p> Cart is empty</p>}
      <div className={classes.total}>
        <span> Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckoutDisplayed && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {ctx.myCart.length > 0 && (
            <button className={classes.button} onClick={onDisplayCheckoutHandler}>
              Order
            </button>
          )}
        </div>
      )}
      {isCheckoutDisplayed && <Checkout onCloseCheckout={onDisplayCheckoutHandler} onOrder = {props.onClose} />}
    </>
  );
};

export default Cart;
