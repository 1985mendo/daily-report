import { Stack, Text } from "@chakra-ui/react"
import { Card } from "@src/component/atom/card/Card"
import { UsericonWithName } from "@src/component/molecules/user/UsericonWithName"

type Props = {
  user: any
}

export const UserCard = (props: Props) => {
  const { user } = props

  return (
    <Card
      maxW={{ base: "100%", md: "350px" }} 
      h="auto" 
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="white"
      boxShadow="md"
    >
      <UsericonWithName image={user.image} name={user.name} />
      <Stack
        spacing={4}
        px={4}
        py={4}
        bg="gray.50"
        w="100%"
        textAlign="center"
      >
        <Text fontWeight="bold" fontSize="lg">{user.name}</Text>
        <Text fontSize="sm" color="gray.500">社員番号: {user.employeeId}</Text>
        <Text fontSize="sm" color="gray.500">メールアドレス: {user.email}</Text>
        <Text fontSize="sm" color="gray.500">担当エリア: {user.area}</Text>
      </Stack>
    </Card>
  )
}

export default UserCard
