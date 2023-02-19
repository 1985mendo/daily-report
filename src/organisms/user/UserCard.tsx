import { Avatar, Box, Stack, Text } from "@chakra-ui/react"

export const UserCard = (props) => {
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
        <Text>山田太郎</Text>
      </Stack>
      <Stack direction="row" spacing={50}>
        <Text fontWeight="bold">社員番号</Text>
        <Text>123456</Text>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Text fontWeight="bold">メールアドレス</Text>
        <Text>123456@gmail.com</Text>
      </Stack>
      <Stack direction="row" spacing={9}>
        <Text fontWeight="bold">担当エリア</Text>
        <Text>北部九州</Text>
      </Stack>
    </Stack>
    </Box>
    </>
  )
}
export default UserCard
