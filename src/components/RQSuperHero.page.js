//fetch just one hero by id
import { useParams } from 'react-router-dom'
import React from 'react'
import { useSuperHeroData } from '../hooks/useSuperHeroData'

export default function RQSuperHeroPage() {
    const { heroId } = useParams();

    const { data, isLoading, isError, error } = useSuperHeroData(heroId);
    console.log("dataaa", data);
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2 style={{ color: "red" }}>{error.message}</h2>
    }

    return (
        <>
            <h3>{data?.data.name}</h3>
            <h4>{data?.data.alterEgo}</h4>
        </>
    )
}
