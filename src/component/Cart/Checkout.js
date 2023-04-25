import { useContext } from "react";
import useInput from "../hooks/use-input";
import classes from "./Checkout.module.css";
import Context from "../../store/Context";

const Checkout = (props) => {
  const ctx = useContext(Context);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangedHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostcode,
    isValid: enteredPostcodeIsValid,
    hasError: postcodeHasError,
    valueChangeHandler: postcodeChangedHandler,
    valueBlurHandler: postcodeBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const nameInputClasses = `${classes.control} ${
    nameInputHasError ? classes.invalid : ""
  }`;
  const streetInputClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;
  const postcodeInputClasses = `${classes.control} ${
    postcodeHasError ? classes.invalid : ""
  }`;
  const cityInputClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostcodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  async function addOrder(order) {
    const response = await fetch(
      "https://react-http-course-44452-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-type": "application/jason",
        },
      }
    );
    const data = await response.json();

   // if (data.)
  }

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      nameBlurHandler();
      streetBlurHandler();
      postcodeBlurHandler();
      cityBlurHandler();
      return;
    } else {
      const order = [
        {
          name: enteredName,
          street: enteredStreet,
          postalCode: enteredPostcode,
          city: enteredCity,
        },
        ctx.myCart,
      ];
      addOrder(order);
      props.onOrder();
      ctx.onResetCart();
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitFormHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
      </div>
      <div className={postcodeInputClasses}>
        <label htmlFor="postal code">Postal Code</label>
        <input
          type="text"
          id="postal code"
          onChange={postcodeChangedHandler}
          onBlur={postcodeBlurHandler}
          value={enteredPostcode}
        />
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCheckout}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
