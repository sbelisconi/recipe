import Nav from "./recipe_component/Nav"
import Banner from "./recipe_component/Banner"
import List from "./recipe_component/List"
import Footer from "./recipe_component/Footer"
import Copy from "./recipe_component/Copy"
import { useEffect, useState } from "react"
import Loader from "./recipe_component/Loader"

const Recipe = () => {
  //Hook: use effect| usestate. Hooks are functions created by react to serve for certain purpose.
  //Hooks but be use inside a function component
  //You cannot use a hook inside a conditional statment
  
  //three state to track what is going on:
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  //a state to store what to filter with
  const [f, setF] = useState("");

  //filter category
  const filterCategory = ()=>{
    const filtered = categories.filter(function(cat){
      return cat.strCategory.toLowerCase().includes(f.toLowerCase())
    })

    return filtered;
  }

  //hook: useEffect | useState
  const requestMaker =()=>{
      fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(function(fakeresp){
        return fakeresp.json()
        })
        .then(function(data){
        setCategories(data.categories) //checking
        setLoading(false)
        })
        .catch(function(err){
        setCategories([])
        setLoading(false)
        setError(err)
        })
    }
  useEffect(function(){
    requestMaker();
  }, [])

  if(loading === true){
    return (
      <Loader/>
    )
  }

  return (
    <div className='container-fluid'>
       <Nav />
       <Banner setF={setF}/>
       <List categories = {filterCategory()} />
       <Footer />
       <Copy />
    </div>
  )
}

export default Recipe