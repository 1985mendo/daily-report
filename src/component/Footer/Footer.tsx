import { chakra, Container, Flex, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const onClickSignin = () => {
    router.push('/signin')
  }
  const onClickSignup = () => {
    router.push('/signup')
  }

  
  return (
    <chakra.footer py={4} bgColor={'blue.600'} color={'white'}>
      <Container maxW={'container.lg'}>
        <Flex flexDirection={'column'} gap={2} alignItems={'start'}>
            <Link lineHeight={1} onClick={onClickSignin}>サインイン</Link>
            <Link lineHeight={1} onClick={onClickSignup}>新規登録</Link>
        </Flex>
      </Container>

    </chakra.footer>
  )
}

export default Footer