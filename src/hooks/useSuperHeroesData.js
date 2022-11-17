import axios from "axios";
import { useQuery, useMutation } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superHeroes")
}

const addSuperHero = (hero) => {
    return axios.post("http://localhost:4000/superHeroes", hero);
}

export const useSuperHeroesData = (onSuccess, onError, options) => {

    return useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            onSuccess,
            onError,
            ...options
        }
    )
}

export const useAddSuperHeroData = () => {
    return useMutation(addSuperHero)
}