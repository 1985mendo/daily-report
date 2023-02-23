import { Avatar, Box, Stack, Text } from "@chakra-ui/react"

export const UserCard = (props: any) => {
  const { user } = props

  return (
    <Box
      maxW={{ base: "90vw", md: "350px" }}
      h="50%"
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
      <Avatar size="xl" name={user.name} src={user.avatarUrl} />
      <Stack
        spacing={4}
        mt={4}
        px={4}
        py={4}
        bg="gray.50"
        w="100%"
        // h="100%"
        textAlign="center"
      >
        <Text fontWeight="bold" fontSize="lg">{user.name}</Text>
        <Text fontSize="sm" color="gray.500">社員番号: {user.employeeId}</Text>
        <Text fontSize="sm" color="gray.500">メールアドレス: {user.email}</Text>
        <Text fontSize="sm" color="gray.500">担当エリア: {user.area}</Text>
      </Stack>
    </Box>
  )
}

export default UserCard
