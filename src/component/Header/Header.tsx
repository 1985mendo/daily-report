import { useAuthContext } from '@src/feature/auth/provider/AuthProvider';
import {
  Button,
  Container,
  Heading,
  chakra,
  useToast,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react'
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
  };
  const handleDaily = () => {
    push('/daily')
  };

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
        <Flex alignItems="center" justifyContent="space-between">
          <Heading color={'white'}>Daily-Report-App</Heading>
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  size={'sm'}
                  name={user?.displayName || ''}
                  src={user?.photoURL || '/default_avatar.jpg'}
                />
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
            <Button as={'a'} colorScheme={'teal'} size="sm" w="80px">
              サインイン
            </Button>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}

export default Header
