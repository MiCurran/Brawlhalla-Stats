import {Text, 
    Image,
    Flex,
    Avatar,
    useColorModeValue,
    Center, 
    SimpleGrid, 
    Box, 
    Stack, 
    Checkbox, 
    Heading, 
    FormControl, 
    Spinner,
    FormLabel, 
    FormHelperText, 
    Input, 
    Button 
} from '@chakra-ui/react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import { getLegendById, getUsersByName } from 'utils/API/helpers';

export default function StatsSearch(props: any) {
    const {query} = props
    const [name, setName] = useState(query || null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getUsers = async () => {
        setLoading(true);
       setResults(await getUsersByName(name));
       console.log(results);
       setLoading(false)
       router.push(`/stats?query=${name}`)
       return true;
    };

    useEffect(() => {
        if (name !== null) {
            getUsers();
        }
    }, [])
    
    
  return (
    <Center flexDirection={'column'} py={10}>
        <Box minWidth={'2xl'}>
            <Heading>Search for user</Heading>
            <Box pb={10}>
                <FormControl py={8}>
                    <FormLabel>Steam Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type='name' />
                    <FormHelperText>Must start with exact match</FormHelperText>
                </FormControl>
            <Button onClick={getUsers}>Search</Button>
            </Box>
            {!!results && 
                <SimpleGrid
                    my={10}
                    columnGap={8}
                    rowGap={8}
                    columns={3}
                >
                    {results.map((user: User) => (
                        <UserCard user={user}/>
                    ))}
                </SimpleGrid>
            }
        </Box>
        {loading && <Spinner size={'xl'}/>}
    </Center>
  )
}

const UserCard = ({user}: {user: User}) => (
    <Center py={6}>
    <Box
      maxW={'270px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      >
      <Flex justify={'center'} mt={-12}>
        <Avatar
          size={'xl'}
          src={`${getLegendById(user.best_legend).legend_name_key}.png`}
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>
      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {user.name}
          </Heading>
          <Text color={'gray.500'}>{user.region}</Text>
        </Stack>
        <Stack direction={'row'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>{user.rating}</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              Elo
            </Text>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>{user.peak_rating}</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
                Peak Elo
            </Text>
          </Stack>
        </Stack>

        <Button
            as={'a'}
            href={`/stats/${user.brawlhalla_id}`}
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}>
          View Stats
        </Button>
      </Box>
    </Box>
  </Center>
);