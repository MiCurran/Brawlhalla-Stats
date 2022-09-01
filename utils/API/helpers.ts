import axios from "axios";
const KEY = process.env.NEXT_PUBLIC_BRAWL_API_KEY;

export const getUserRanked = async (id: number) => {
   const data = (await axios.get(`https://api.brawlhalla.com/player/${id}/ranked?api_key=${KEY}`)).data
    return data;
};