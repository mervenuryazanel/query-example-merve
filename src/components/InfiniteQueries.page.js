import { useInfiniteQuery } from "react-query"
import axios from "axios"
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}
export default function InfiniteQueriesPage() {
    const { data, isLoading, error, isError, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['colors'], fetchColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                } else {
                    return undefined //sets hasPage to false
                }
            }
        });

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <div>
                <h2>Infinite Queries Page</h2>
                {data?.pages.map((group, index) => {
                    return (
                        <Fragment key={index}>
                            {
                                group.data.map((color) => {
                                    return (
                                        <h2 key={color.id}>
                                            {color.id}-{color.label}
                                        </h2>
                                    )
                                })
                            }
                        </Fragment>
                    )
                })}
            </div>
            <div>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>Show more</button>
            </div>

            <div>
                {isFetching && !isFetchingNextPage ? 'Fecthing...' : null}
            </div>

        </>
    )
}
