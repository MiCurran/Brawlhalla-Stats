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
          <a href="https://nextjs.org">Brawlhalla Elo Tracker</a>
        </MotionHeading>

        <Text className={styles.description}>
          Made with ❤️
        </Text>

        <VStack spacing={5} my={10}>
        <MotionLink
            initial={'hidden'}
            animate={'visibleExtraDelay'}
            variants={animationVariants}
            href="/track" >
            <h2>Start Tracking &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </MotionLink>

          <MotionLink
            initial={'hidden'}
            animate={'visible'}
            variants={animationVariants}
            href="https://nextjs.org/docs" >
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
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
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
