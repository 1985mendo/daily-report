import UserCard from '@src/organisms/user/UserCard'
import { Flex } from '@chakra-ui/react'

const user = {
  name: "山田太郎",
  image: "",
  employeeId: "123456",
  email: "123456@gmail.com",
  area: "北部九州"
}

const Page = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="80vH"
    >
      <UserCard user={user}/>
    </Flex>
  )
}

export default Page
