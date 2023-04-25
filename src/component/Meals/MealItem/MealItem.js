
import {useContext} from 'react';
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import Context from "../../../store/Context";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const ctx = useContext(Context);


 const onAddToCartHandler = (amount) => {
    ctx.onAddToCart({
      id: props.id,
      name: props.name,
      amount: +amount,
      price: props.price
    })
  //ajouter l'add au
 }

  return (
    <li key={props.id} className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
    </li>
  );
};
 
export default MealItem;
