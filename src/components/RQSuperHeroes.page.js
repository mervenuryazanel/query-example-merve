//here you can see SuperHeroes page with data fetching with React Query

//react query abstracts away all the useState and useEffect and their effects in the data fetch

import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes=()=>{
  return axios.get("http://localhost:4000/superheros")
}
export  function RQSuperHeroesPage() {
  
  // const results= useQuery('super-heroes',()=>{
  //   return axios.get("http://localhost:4000/superheros")
  // })
  // in th results there are all information that belongs to the query. It can be overwhelming later.
  // So that we can be more spesific so look above

  const {isLoading, data}= useQuery('super-heroes',fetchSuperHeroes)

    if(isLoading){
      return <h2>Loading...</h2>
    }
  
  return (
    <>
    <h2>RQ Super Heroes Page</h2>
    {data?.data.map((hero)=>{
      return <div key={hero.name}> {hero.name}</div>
    })}
    </>
  )
}

 