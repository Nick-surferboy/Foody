import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";


const AvailableMeals = (props) => {
  

  return (
    <Card className={classes.meals}>
      <ul>
        {props.availableMeals.map((meal) => {
          return (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              desc={meal.description}
              price={meal.price}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
