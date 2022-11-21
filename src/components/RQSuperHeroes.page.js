//here you can see SuperHeroes page with data fetching with React Query
//react query abstracts away all the useState and useEffect and their effects in the data fetch
import { useState } from "react";
import { useSuperHeroesData, useAddSuperHeroData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";


export function RQSuperHeroesPage() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEGo] = useState('');

  const onSuccess = ({ data }) => {
    console.log("Data fetching is successfull.", data);
  }

  const onError = (error) => {
    console.log("Error while data fetcing", error);
  }


  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);
  const { mutate: addHero, isLoading: isLoadingAdd, isError: isErrorAdd, error: errorAdd } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2 style={{ color: "red" }}>{error.message}</h2> //it may take a little time cause react-query automatically re-tries the api request
  }

  if (isErrorAdd) {
    return <h2 style={{ color: "red" }}>{errorAdd.message}, please try again...</h2>
  }
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="alter ego" type="text" value={alterEgo} onChange={(e) => setAlterEGo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add Hero</button>
        {isLoadingAdd && 'Adding the new hero...'}
      </div>
      <div>
        <button onClick={refetch}>Show Heroes</button>
      </div>
      <div>

        {
          data?.data.map(hero => {
            return (
              <div key={hero.id}>
                <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
              </div>)
          })
        }
        {/* {isFetching ? 'Loading...' : null} */}
      </div>
    </>
  )
}

