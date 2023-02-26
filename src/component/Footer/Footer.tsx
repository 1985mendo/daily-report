import { Box, chakra, Container, Flex, Link } from '@chakra-ui/react'
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
    <Box pb={50}>
      <chakra.footer
        py={4}
        bgColor={'blue.600'}
        color={'white'}
        position={`fixed`}
        bottom={0}
        width={`100%`}
        h={'50px'}
      >
        <Container maxW={'container.lg'}>
          <Flex
            flexDirection={'column'}
            gap={2}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            h={'100%'}
          >
            <Flex width={'100%'} justifyContent={'center'}>
              <Box>
                <Link lineHeight={1} onClick={onClickSignin}>
                  サインイン
                </Link>
              </Box>
              <Box ml={2}>
                <Link lineHeight={1} onClick={onClickSignup}>
                  新規登録
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </chakra.footer>
    </Box>
  )
}

export default Footer
