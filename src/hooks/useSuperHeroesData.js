import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheros")
}

export const useSuperHeroesData = (onSuccess, onError, properties) => {

    return useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            onSuccess,
            onError,
            // select: (data) => {
            //     const heroNames = data.data.map((hero) => hero.name);
            //     return heroNames;
            // },
            ...properties
        }
    )
}