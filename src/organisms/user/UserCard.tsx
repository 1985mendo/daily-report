import { Avatar, Box, Stack, Text } from "@chakra-ui/react"

// TODO:any修正
export const UserCard = (props: any) => {
  const { user } = props
  return (
    <>
      <Avatar 
        height={120}
        width={120}
        marginLeft={150}
        marginTop={30}
      />
      <Box
        display="flex"
        alignItems="start"
        justifyContent="center"
        height="50vh"
      >
        <Stack spacing={4} marginTop={30}>
        <Stack direction="row" spacing={78}>
          <Text fontWeight="bold">名 前</Text>
          <Text>{user.name}</Text>
        </Stack>
        <Stack direction="row" spacing={50}>
          <Text fontWeight="bold">社員番号</Text>
          <Text>{user.employeeId}</Text>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Text fontWeight="bold">メールアドレス</Text>
          <Text>{user.email}</Text>
        </Stack>
        <Stack direction="row" spacing={9}>
          <Text fontWeight="bold">担当エリア</Text>
          <Text>{user.area}</Text>
        </Stack>
      </Stack>
    </Box>
    </>
  )
}
export default UserCard
