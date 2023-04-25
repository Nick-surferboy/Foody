import { useState } from "react";

import MIFClasses from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button";


const MealItemForm = (props) => {
  const [enteredAmount, setEnteredAmount] = useState(1);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(enteredAmount);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
   
  };

  return (
    <form className={MIFClasses.form} onSubmit={onSubmitHandler}>
      <Input
        label="Amount"
        input={{
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          value:{enteredAmount},
          onChange: amountChangeHandler,
        }}
      />
      <Button label="+ Add" type="submit" />
    </form>
  );
};

export default MealItemForm;
