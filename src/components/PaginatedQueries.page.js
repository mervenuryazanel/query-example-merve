import { useState } from "react";
import { useQuery } from "react-query"
import axios from "axios"

const fetchColors = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

export default function PaginatedQueriesPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const { data, isLoading, error, isError, isFetching } = useQuery(['colors', pageNumber], () => fetchColors(pageNumber),
        {
            keepPreviousData: true //query maintain the data from last successfull fetch when the new data is requested even if the query key has changed
        }
    );

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>Paginated Queries Page</h2>
            {data?.data.map((color) => {
                return (
                    <div key={color.id}>
                        <h3>{color.id}- {color.label}</h3>
                    </div>
                )
            })}

            <div>
                <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Previos Page</button>
                <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next Page</button>

            </div>
            {isFetching && 'Loading...'}
        </>
    )
}
