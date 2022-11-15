//here you can see SuperHeroes page with data fetching with React Query

//react query abstracts away all the useState and useEffect and their effects in the data fetch

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheros")
}
export function RQSuperHeroesPage() {
  const [shouldFetch, setShouldFetch] = useState(true);

  const onSuccess = ({ data }) => {
    console.log("Data fetching is successfull.", data);
    if (data.length === 4) {
      //stop polling

      setShouldFetch(false); //if there will be 4 heros stop the polling
    }
  }

  const onError = (error) => {
    console.log("Error while data fetcing", error);
    //stop polling
    setShouldFetch(false); //if there will be an error stop the polling

  }

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      refetchInterval: shouldFetch ? 2000 : false, //if the shouldFetch true then refetch every two seconds, else don't refetch
      onSuccess,
      onError
    }
  )

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2 style={{ color: "red" }}>{error.message}</h2> //it may take a little time cause react-query automatically re-tries the api request
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}> {hero.name}</div>
      })}
    </>
  )
}

