import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

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
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        onSuccess: () => { //run after mutation is successfull (invalidate querie's method for achieving that.)
            queryClient.invalidateQueries('super-heroes') //by this invalidation react query refetch the 'super-heros' data
        }
    })
}