import { AppProps } from 'next/app';
import '../theme/globals.css'
import { ChakraProvider} from "@chakra-ui/react"
import { theme } from '../theme/theme';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Nav/Sidebar';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
      <ChakraProvider theme={theme}>
        {router.pathname === '/'
          ? <Component {...pageProps} />
          : <Sidebar><Component {...pageProps} /></Sidebar>
        }
          
      </ChakraProvider>
  )
}

export default App
