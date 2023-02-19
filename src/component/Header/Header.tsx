import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { Button, Container, Heading, chakra, useToast, Flex, Spacer, Menu, MenuButton, Avatar, MenuList, MenuItem } from '@chakra-ui/react'
import { FirebaseError } from '@firebase/util'
import { getAuth, signOut } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Header = () => {
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleProf = () => {
    push('/profile')
  }
  const handleDaily = () => {
    push('/daily')
  }
  
  const handleSignOut = async () => {
    console.log(isLoading)
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      })
      push('/signin')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
      <Flex>
          <Heading color={'white'}>Daily-Report-App</Heading>
          <Spacer aria-hidden />
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar flexShrink={0} width={10} height={10} />
              </MenuButton>
              <MenuList py={0}>
                <MenuItem onClick={handleProf}>プロフィール</MenuItem>
                <hr />
                <MenuItem onClick={handleDaily}>日報</MenuItem>
                <hr />
                <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
              </MenuList>
            </Menu>
           ) : (
              <Button as={'a'} colorScheme={'teal'}>
                サインイン
              </Button>
       )}

        </Flex>
      </Container>
    </chakra.header>
  )
}
export default Header