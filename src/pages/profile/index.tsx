import { Flex } from "@chakra-ui/react"
import { UserCard } from "@src/organisms/user/UserCard"

type User = {
  name: string;
  image: string;
  employeeId: string;
  email: string;
  area: string;
}

const user: User = {
  name: "山田太郎",
  image: "",
  employeeId: "123456",
  email: "123456@gmail.com",
  area: "北部九州",
}

const Page = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100%"
      backgroundColor="#e4f9f5"
      flexDirection="column"
      padding={10}
      margin="auto"
    >
      <UserCard user={user} />
    </Flex>
  )
}

export default Page;
