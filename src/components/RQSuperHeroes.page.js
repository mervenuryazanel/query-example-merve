//here you can see SuperHeroes page with data fetching with React Query

//react query abstracts away all the useState and useEffect and their effects in the data fetch

import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes=()=>{
  return axios.get("http://localhost:4000/superheros")
}
export  function RQSuperHeroesPage() {
  
  const {isLoading, data, isError, error, isFetching}= useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
     refetchInterval:2000, // the query will continuously refetch at this frequency in milliseconds.
     refetchIntervalInBackground:true 
     //If set to true, the query will continue to refetch while their tab/window is in the background. Defaults to false.
    }
    )

  console.log({isLoading, isFetching});

    if(isLoading){
      return <h2>Loading...</h2>
    }

    if(isError){
      return <h2 style={{color:"red"}}>{error.message}</h2> //it may take a little time cause react-query automatically re-tries the api request
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

 