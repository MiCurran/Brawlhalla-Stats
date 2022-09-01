import Home from '@/views/Home/Home';
import { CustomHead } from '@/components/CustomHead';
import axios from 'axios';
import Track from '@/views/Track/Track';
import {Box} from '@chakra-ui/react';
import { getUserRanked } from 'utils/API/helpers';

interface TrackPageProps {
    brawlID: number,
    initStats: any
}

export default function TrackPage(props: TrackPageProps) {
    const {brawlID, initStats} = {...props}

  return (
    <Box>
        <CustomHead title={`${initStats.name} Stat Tracking`} />
        <Track player={initStats}/>
    </Box>
  )
}

export const getServerSideProps = async (context: any) => {
    const id = context.query.brawlID
    const data = await getUserRanked(id)
    const player = {
        "name": "test_name",
        "brawlhallaId": id,
        "rating": 0,
        "peakRating": 0,
        "tier": "",
        "wins": 0,
        "games": 0,
        "losses": 0,
        "region": "",
        "globalRank": 0,
        "regionRank": 0,

    }
   if (data) {
        player.brawlhallaId = data.brawlhalla_id;
        player.name = data.name;
        player.rating = data.rating;
        player.peakRating = data.peak_rating;
        player.tier = data.tier;
        player.wins = data.wins;
        player.games = data.games;
        player.losses = player.games - player.wins;
        player.region = data.region;
        player.globalRank = data.global_rank;
        player.regionRank = data.region_rank;
    } 
    return {
        props: {
            brawlID: id || null,
            initStats: player
        }
    }
};