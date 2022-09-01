import {Text, Center, SimpleGrid, Box, Stack, Checkbox } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { animationVariants } from '../../theme/Animations/simpleVariants';
import { ReactChild, ReactFragment, ReactPortal, SetStateAction, useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color'
import { getUserRanked } from 'utils/API/helpers';
import { config } from 'utils/config';
const MotionText = motion(Text);

interface TrackProps {
    player: any;
}

const HeaderRow = ({label, color}) => {
    return (
    <Box bgColor={color} color={config.headerColor} fontWeight={'bold'} width={'150px'} p={4}>
                <MotionText
                variants={animationVariants}
                initial={'hidden'}
                animate={'visible'}
        >{label}</MotionText>
    </Box>
)};

const NameCol = ({data, color }: { data: boolean | ReactChild | ReactFragment | ReactPortal, color: string }) => (
    <Center
        bgColor={color}
        color={config.headerColor}
        fontWeight={'bold'}
        width={'150px'}
        p={4}
        fontSize={'lg'}
        borderTopRadius={10}
    >
        <Text>{data}</Text>
    </Center>
);

const DataCol = (data: { data: boolean | ReactChild | ReactFragment | ReactPortal; }) => (
    <Box
        bgColor={'white'}
        color={config.textColor}
        fontWeight={'black'}
        width={'150px'}
        p={2}
        fontSize={'2xl'}
    >
        <MotionText
            variants={animationVariants}
            initial={'hidden'}
            animate={'visible'}
        >
            {data.data}
        </MotionText>
    </Box>
);

export default function Track(props: TrackProps) {
    const {player} = {...props};
    const [playerCurrent, setPlayerCurrent] = useState(player)
    const [showGlobal, setShowGlobal] = useState(false);
    const [showRegion, setShowRegion] = useState(false);
    const [color, setColor] = useState(config.baseColor);
    let cols = 3
    if (showGlobal){cols += 1}
    if (showRegion){cols += 1}

    const handleChangeColor = (color: { hex: SetStateAction<string>; }) => {
        console.log
        setColor(color.hex);
      };

     const updateUser = async () => {
        const updated = await getUserRanked(player.brawlhallaId);
        let temp = playerCurrent;
        temp.wins = updated.wins - player.wins;
        temp.losses = (updated.games - updated.wins) - player.losses
        setPlayerCurrent(temp);
        console.log(updated);
    };

    useEffect(() =>{
        let interval = setInterval(() => updateUser(), (config.updateInterval))
        return () => clearInterval(interval)
    },[])
    
  return (
    <Center flexDirection={'column'} py={10}>
        <SimpleGrid columns={cols} gap={0}>
        <NameCol data={playerCurrent.name} color={color}/>
        <Box/>
        <Box/>
        </SimpleGrid>
        <SimpleGrid
            columns={cols}
            gap={0}
            textAlign={'center'}
            shadow={'2xl'}
            mb={10}
            borderBottomRadius={'2xl'}
        
        >
            <HeaderRow label='Elo' color={color}/>
            <HeaderRow label='Record' color={color}/>
            <HeaderRow label='Elo +/-' color={color}/>
            {showGlobal && 
            <HeaderRow label='Global Rank' color={color}/>
            }
            {showRegion && 
            <HeaderRow label='Region Rank' color={color}/>
            }
            <DataCol data={playerCurrent.rating}/>
            <DataCol data={`${(playerCurrent.wins - player.wins)} - ${playerCurrent.losses - player.losses}`}/>
            <DataCol data={playerCurrent.rating - player.rating}/>
            {showGlobal && 
            <DataCol data={playerCurrent.globalRank}/>
            }
            {showRegion && 
            <DataCol data={playerCurrent.regionRank}/>
            }
        </SimpleGrid>
      <Stack direction='column'>
        <Checkbox 
            isChecked={showGlobal} 
            onChange={() => setShowGlobal(!showGlobal)}
        >
            Show Global Rank
        </Checkbox>
        <Checkbox 
            isChecked={showRegion} 
            onChange={() => setShowRegion(!showRegion)}
        >
            Show Region Rank
        </Checkbox>
        <Text>Color Scheme</Text>
        <TwitterPicker 
        color={ color }
        onChangeComplete={handleChangeColor}
        />
      </Stack>
    </Center>
  )
}
