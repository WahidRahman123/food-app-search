import { useEffect, useState } from "react";
import styles from './fooddetails.module.css'
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "735203516e8a43619af3a154370d6087";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} />

        <div className={styles.recipeDetails}>
          <span>
            <strong>⏲️{food.readyInMinutes} Minutes </strong>
          </span>
          <span>
            👪<strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>{food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-vegetarian"}</strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          💲<span><strong>{Math.round(food.pricePerServing / 100)} per serving</strong></span>
        </div>


        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading}/>


        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ol>
              {food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
