import { Flex, Text, Avatar } from "@chakra-ui/react"
import type { User } from "@src/pages/profile"

type Props = {
  user: User & { name: string, image: string },
  onEdit: () => void
}

const UserCard: React.FC<Props> = ({ user, onEdit }) => {
  return (
    <Flex
      w="md"
      padding={4}
      boxShadow="md"
      borderRadius={4}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      onClick={onEdit}
    >
      <Avatar size={'sm'} name={user.name} />
      <Text fontWeight="bold" fontSize="2xl" mt={2}>
        {user.name}
      </Text>
      <Text fontSize="md" mt={1}>
        社員番号: {user.employeeId}
      </Text>
      <Text fontSize="md" mt={1}>
        メールアドレス: {user.email}
      </Text>
      <Text fontSize="md" mt={1}>
        担当エリア: {user.area}
      </Text>
    </Flex>
  )
}

export default UserCard
