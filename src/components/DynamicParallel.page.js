//fetch data for multiple heroes by id
import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superHeroes/${heroId}`);
}

export default function DynamicParallelPage({ heroIds }) {
    const queryResults = useQueries( //it returns an array of query results
        heroIds.map((id) => {
            return {
                queryKey: ['super- hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )
    // console.log("query results", queryResults);
    return (
        <>
            <h2>Dynamic Parallel Page</h2>

            {
                queryResults.map((data) => {
                    return (
                        <div>
                            <p>{data?.data?.data.name}</p>
                        </div>
                    )
                })
            }
        </>
    )
}
