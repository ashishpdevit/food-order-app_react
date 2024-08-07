import { useEffect, useState } from "react";
import Card from "../UI/Card.js";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem.js";
import loadImg from "../../assets/gifloader.gif";
import loadingImg from "../../assets/loading.gif";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];
const AvailableMeals = (props) => {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        // "https://react-http-demo-a7ed8-default-rtdb.firebaseio.com/meals.json"
        // "https://food-app-c10a5-default-rtdb.firebaseio.com/meals.json"
        `${process.env.REACT_APP_API_URL}/meals.json`
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMealData(loadedMeals);
      setIsLoading(false);
    };
    //fetchMeals();
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = mealData.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <ul>{mealsList}</ul>;

  if (isLoading) {
    content = <img className={classes.center} src={loadingImg} width="50%" />;
  }
  if (httpError) {
    content = <h2 className={classes.error}>{httpError}</h2>;
  }
  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
