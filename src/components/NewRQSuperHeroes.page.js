import { useSuperHeroesData } from "../hooks/useSuperHeroesData"


export function NewRQSuperHeroesPage() {

    const onSuccess = () => {
        console.log("fetching is successfull");
    }

    const onError = () => {
        console.log("there is an error while fetching");
    }

    const { data, isLoading, isError, error, refetch } = useSuperHeroesData(onSuccess, onError, { enabled: false });
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>New Super Heroes Page</h2>
            <button onClick={refetch}>Show Heroes</button>
            {data?.map((hero) => {
                return (<p key={hero}>{hero}</p>)
            })}
        </>
    )

}