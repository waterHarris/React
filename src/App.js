import React,{useEffect, useState} from "react";
import Recipe  from "./Recipe";
import logo from './logo.svg';
import './App.css';

const App =() =>{
const APP_ID ="0d76cd76";
const APP_KEY ="4a4719cef979131bc6b5e703c73dc7f6";
const [recipes, setRecipes] =useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken');

useEffect( ()=>{
getRecipes();
},[query]);

const getRecipes =async()=>{
const response =await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=0d76cd76&app_key=4a4719cef979131bc6b5e703c73dc7f6`);
const data =  await response.json();
console.log(data.hits);
setRecipes(data.hits);
};
const updateSearch = e =>{
  setSearch(e.target.value);
  console.log(search);
}
const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

  return(
<div className="App">
 <h1 className="app-name">This is Harris Search Recipes App</h1>
<form onSubmit={getSearch} className="search-form" >
  <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
  <button className="search-button" type="submit" >Search</button>
</form>
<div className="recipes">
{recipes.map(recipe =>(
  
<Recipe 
key={recipe.recipe.totalWeight}
title={recipe.recipe.label} 
calories={recipe.recipe.calories}
image={recipe.recipe.image}
ingredients = {recipe.recipe.ingredients}
/>

))};
</div>
</div>
  );
}

export default App;
