import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheros")
}

const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends")
}


export default function ParallelQueriesPage() {

    const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeros);
    const { data: friends } = useQuery('friends', fetchFriends);
    return (
        <div>Parallel Queries Page</div>
    )
}
