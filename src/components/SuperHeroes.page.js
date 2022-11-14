//here you can see SuperHeroes page with data fetching in traditional way (useEffect and useState)
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export  function SuperHeroesPage() {
 
  const [isLoading, setIsLoading]=useState(true);
  const [data, setData]=useState([]);


  useEffect(()=>{
    axios.get("http://localhost:4000/superheros")
    .then((res)=>{
      setData(res.data);
      setIsLoading(false);
    })
  }
  ,[])

  if(isLoading){
    return <h2>Loading...</h2>
  }


  return (
    <div>
      <h2>Traditional Super Heroes Page</h2>

      {data.map((hero)=>{
        return <div key={hero.name}>{hero.name} </div>
      })}
    </div>
  )
}
