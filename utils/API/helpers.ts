import axios from "axios";
import { LEGENDS } from "utils/legendData";
const KEY = process.env.NEXT_PUBLIC_BRAWL_API_KEY;

export const getUserRanked = async (id: number) => {
   const data = (await axios.get(`https://api.brawlhalla.com/player/${id}/ranked?api_key=${KEY}`)).data
    return data;
};

export const getUsersByName = async (name: string) => {
    const data = (await axios.get(`https://api.brawlhalla.com/rankings/1v1/all/1?name=${name}&api_key=${KEY}`)).data
    return data
};

export const getLegendById = (legendId: number) => {
    const legend = LEGENDS.find((legend) => legend.legend_id === legendId)
    return (
        legend
    )
};