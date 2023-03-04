import type { NextPage } from 'next'
import { Box, Center, Heading, Text } from '@chakra-ui/react'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'

const Page: NextPage = () => {
  return (
    <AuthGuard>
      <Center h="100vh">
        <Box>
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={{ base: 4, md: 8 }}>Daily Report App</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>Next.js/TypeScript/React/FIREBASE/ChakraUI</Text>
          <hr />
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={{ base: 2, md: 4 }}>Concept</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={{ base: 2, md: 4 }}>日報作成を支援するアプリケーション</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={{ base: 2, md: 4 }}>Target User</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={{ base: 4, md: 8 }}>外回り営業マン、移動が多い職種の方々</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={{ base: 2, md: 4 }}>Usage Flow</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={{ base: 2, md: 4 }}>1.サインイン → 2.出発地点にて地図ボタン押下 → 3.日報作成時、訪問場所、経路を記録 → 一定時間同一場所に留まると警告が表示される（2分間）</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={{ base: 2, md: 4 }}>Production Period</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={{ base: 2, md: 4 }}>1 month</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={{ base: 2, md: 4 }}>Future Tasks</Text>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={{ base: 2, md: 4 }}>地点のデータ保持機能、地図へのコメント記入機能を追加し、本体のみで日報作成ができるようにする。</Text>
        </Box>
      </Center>
    </AuthGuard>
  )
}

export default Page
