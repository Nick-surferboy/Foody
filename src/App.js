import { useState, useEffect, useCallback } from "react";

import MainHeader from "./component/MainHeader/MainHeader";
import AvailableMeals from "./component/Meals/AvailableMeals";
import MealsSummary from "./component/Meals/MealsSummary";
import Modal from "./component/Cart/Modal";
import Card from "./component/UI/Card";


function App() {
  const [cartDisplayState, setCartDisplaySate] = useState(false);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const displayCartHandler = () => {
    setCartDisplaySate((prev) => {
      return !prev;
    });
  };

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-course-44452-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);
  

  let content = <Card>No meals are available</Card>;
  if (meals.length > 0) {
    content = <AvailableMeals availableMeals={meals} />;
  }
  if (error) {
    content = <Card>{error}</Card>;
  }
  if (isLoading) {
    content = <Card>Loading...</Card>;
  }

  return (
    <>
      {cartDisplayState && <Modal onClose={displayCartHandler} />}
      <MainHeader onDisplay={displayCartHandler} />
      <section>
        <MealsSummary />
        {content}
      </section>
    </>
  );
}

export default App;
