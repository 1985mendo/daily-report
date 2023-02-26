import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider'
import Header from '@src/component/Header/Header'
import Footer from '@src/component/Footer/Footer'
import "@src/global.css"

initializeFirebaseApp()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Box bg={"#aafafc"}>
        <Header />
        <Stack as="main" minHeight="100vh">
          <Component {...pageProps} />
        </Stack>
        <Footer />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
