import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon.js";

import Context from "../../store/Context";

const HeaderCardButton = (props) => {
  const ctx = useContext(Context);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numberOfItems = ctx.myCart.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (ctx.myCart.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer) ;
    }
  }, [ctx.myCart]);

  return (
    <>
      <button className={btnClasses} onClick={props.onDisplay}>
        <div className={classes.icon}>
          <CartIcon />
        </div>
        Your Cart
        <div className={classes.badge}>{numberOfItems}</div>
      </button>
    </>
  );
};

export default HeaderCardButton;
