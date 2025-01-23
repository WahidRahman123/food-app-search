import { useEffect, useState } from "react";
import styles from "./search.module.css";

const url = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "735203516e8a43619af3a154370d6087";

export default function Search({foodData, setFoodData}) {
    const [query, setQuery] = useState("pizza");
    //* Syntax of the useEffect Hook
    //* useEffect(callback function, dependency list which is an Array)
    useEffect(()=>{
        async function fetchFood() {
            const res = await fetch(`${url}?query=${query}&apiKey=${API_KEY}`)
            const data = await res.json()
            // console.log(data.results);
            setFoodData(data.results);
        }
        fetchFood();
    }, [query])

  return (
    <div className={styles.searchContainer}>
      <input className={styles.input} type="text" onChange={(e)=>setQuery(e.target.value)} value={query}/>
    </div>
  );
}
