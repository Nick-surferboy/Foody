import { useState } from "react";

const useInput = (validateValueFnc) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValueFnc(enteredValue);
  const hasError = isTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError, //equal at hasError: hasError
    valueChangeHandler,
    valueBlurHandler,
    reset
  };
};

export default useInput;
