import { useQuery } from "react-query";
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//     return axios.get(`http://localhost:4000/superheros/${heroId}`)
// }
// export const useSuperHeroData = (heroId) => {
//     return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId));
// }

// for a better practise read the following code

const fetchSuperHero = ({ queryKey }) => {
    const heroId = queryKey[1];
    console.log("query key:", queryKey);
    return axios.get(`http://localhost:4000/superheros/${heroId}`)
}
export const useSuperHeroData = (heroId) => {
    return useQuery(['super-hero', heroId], fetchSuperHero);
}
