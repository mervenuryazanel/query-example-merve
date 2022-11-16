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

    // console.log("data heroes", superHeroes);
    // console.log("data friends", friends);
    return (
        <>
            <h2>Parallel Queries Page</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ margin: 20 }}>

                    <h3>Heroes</h3>
                    {superHeroes?.data.map((hero) => {
                        return (
                            <div key={hero.id}>
                                <p>{hero.name} - {hero.alterEgo}</p>
                            </div>
                        )
                    })}
                </div>

                <div style={{ margin: 20 }}>

                    <h3>Friends</h3>
                    {friends?.data.map((friend) => {
                        return (
                            <div key={friend.id}>
                                <p>{friend.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div >
        </>
    )
}
