import {Heading, Text, Link, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import styles from './Home.module.css'
import { motion } from 'framer-motion'
import { animationVariants } from '../../theme/Animations/simpleVariants';

const MotionHeading = motion(Heading);
const MotionLink = motion(Link);

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <MotionHeading
          initial={'hidden'}
          animate={'visible'}
          variants={animationVariants}
          className={styles.title} 
          color="brand.900">
          <a href="https://nextjs.org">Brawlhalla Stats &amp; Elo Tracker</a>
        </MotionHeading>

        <Text className={styles.description}>
          Made with ❤️
        </Text>

        <VStack spacing={5} my={10}>
        <MotionLink
            initial={'hidden'}
            animate={'visibleExtraDelay'}
            variants={animationVariants}
            href="/stats" 
        >
            <h2>Lookup Stats &rarr;</h2>
          </MotionLink>
        <MotionLink
            initial={'hidden'}
            animate={'visibleExtraDelay'}
            variants={animationVariants}
            href="/track" >
            <h2>Stat Tracking &rarr;</h2>
          </MotionLink>

          <MotionLink
            initial={'hidden'}
            animate={'visible'}
            variants={animationVariants}
            href="https://nextjs.org/docs" >
            <h2>Documentation &rarr;</h2>
          </MotionLink>
          <MotionLink
            initial={'hidden'}
            animate={'visibleExtraDelay2'}
            variants={animationVariants}
            href="https://github.com/MiCurran/Brawlhalla-Stats"
          >
            <h2>View Code&rarr;</h2>
          </MotionLink>
        </VStack>
      </main>
    </div>
  )
}
