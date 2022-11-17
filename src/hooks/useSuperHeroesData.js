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
        onSuccess: (data) => { //data is entire response that turns from post request
            // queryClient.invalidateQueries('super-heroes') //by this invalidation react query refetch the 'super-heros' data
            queryClient.setQueryData('super-heroes',  // //setQueryData updates the query cache
                (oldQueryData) => { // this function automatically receives the all query data (what is present in the query cache) as an argument
                    return {
                        ...oldQueryData,
                        data: [...oldQueryData.data, data.data]
                    }

                })
        }
    })
}