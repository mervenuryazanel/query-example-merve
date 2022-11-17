import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//     return axios.get(`http://localhost:4000/superHeroes/${heroId}`)
// }
// export const useSuperHeroData = (heroId) => {
//     return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId));
// }

// for a better practise read the following code

const fetchSuperHero = ({ queryKey }) => {
    const heroId = queryKey[1];
    console.log("query key:", queryKey);
    return axios.get(`http://localhost:4000/superHeroes/${heroId}`)
}
export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient(); //in the App.js we declerad the queryClient before, so that queryClient instance can access to the query cache
    return useQuery(['super-hero', heroId], fetchSuperHero,
        {
            initialData: () => {
                const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === parseInt(heroId)); //get the hero from hero list by id

                if (hero) {
                    return {
                        data: hero
                    }
                } else {
                    return undefined;
                }
            }
        });
}
