//here you can see SuperHeroes page with data fetching with React Query
//react query abstracts away all the useState and useEffect and their effects in the data fetch
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export function RQSuperHeroesPage() {
  const onSuccess = ({ data }) => {
    console.log("Data fetching is successfull.", data);
  }

  const onError = (error) => {
    console.log("Error while data fetcing", error);
  }

  const { isLoading, data, isError, error, isFetching } = useSuperHeroesData(onSuccess, onError);

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
      {/* {
        data?.map(heroName => {
          return <div key={heroName}>{heroName}</div>
        })
      } */}

      {
        data?.data.map(hero => {
          return (
            <div key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
            </div>)
        })
      }
    </>
  )
}

