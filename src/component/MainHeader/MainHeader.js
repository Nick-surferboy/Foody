import classes from "./MainHeader.module.css";
import mealsImage from "../../data/meals.jpeg";
import HeaderCardButton from "./HeaderCartButton" ;

const MainHeader = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCardButton onDisplay={props.onDisplay}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="meals" />
      </div>
    </>
  );
};

export default MainHeader;
