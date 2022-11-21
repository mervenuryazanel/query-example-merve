import { request } from "../utils/axios-utils";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchSuperHeroes = () => {
    return request({ url: '/superHeroes' })
}

const addSuperHero = (hero) => {
    return request({
        url: '/superHeroes', method: 'post', data: hero
    })
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
        // onSuccess: (data) => { //data is entire response that turns from post request
        //     // queryClient.invalidateQueries('super-heroes') //by this invalidation react query refetch the 'super-heros' data
        //     queryClient.setQueryData('super-heroes',  // //setQueryData updates the query cache
        //         (oldQueryData) => { // this function automatically receives the all query data (what is present in the query cache) as an argument
        //             return {
        //                 ...oldQueryData,
        //                 data: [...oldQueryData.data, data.data]
        //                 //oldQueryData.data is current list of hero objects
        //                 //data.data is the object that returns from the response (new created hero's object)
        //             }

        //         })
        // }
        onMutate: async (newHero) => { //is called before the mutation function is fired. 
            await queryClient.cancelQueries('super-heroes') //cancels any outgoing refetches so data wont overrite the optimistic update
            const previousData = queryClient.getQueryData('super-heroes')//get current query data before any update (it helps us to rollback if the mutations fails)
            queryClient.setQueryData('super-heroes',  // //setQueryData updates the query cache
                (oldQueryData) => {
                    return {
                        ...oldQueryData,
                        // data: [...oldQueryData.data, newHero.data]
                        data: [
                            ...oldQueryData.data, { id: oldQueryData?.data?.lenght + 1, ...newHero } //it updates the hero list even before the post request
                        ],

                    }

                })
        },
        onError: (_error, _hero, context) => {
            //context access query data and that return from the on mutate call back and sets the old query data as current data when an error occurs
            queryClient.setQueryData('super-heroes', context.previousData)
        },
        onSettled: () => { //here refetch the super heroes
            queryClient.invalidateQueries('super-heroes') //ensure the client state is in sync with the server state
        }
    })
}