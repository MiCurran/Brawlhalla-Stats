import Home from '@/views/Home/Home';
import { CustomHead } from '@/components/CustomHead';
import axios from 'axios';
import Track from '@/views/Track/Track';
import {Box} from '@chakra-ui/react';
import { getUserRanked } from 'utils/API/helpers';
import StatsSearch from '@/views/Stats/StatsSearch';
import Sidebar from '@/components/Nav/Sidebar';


export default function StatsHome(props: any) {
  const {query} = props;
  return (
    <Box>
        <CustomHead title={`Stats Search`} />
        <StatsSearch query={query}/>
    </Box>
  )
}

export const getServerSideProps = async (context: any) => {
  const query = context.query.query || null
  return {
      props: {
          query
      }
  }
}