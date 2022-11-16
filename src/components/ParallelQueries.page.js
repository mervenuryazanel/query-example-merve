import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superHeroes")
}

const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends")
}


export default function ParallelQueriesPage() {

    const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes);
    const { data: friends } = useQuery('friends', fetchFriends);
    return (
        <div>Parallel Queries Page</div>
    )
}
