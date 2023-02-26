import { Flex, Text, Image } from "@chakra-ui/react";
import type { User } from "@src/pages/profile";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
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
    >
      {user.image && <Image src={user.image} borderRadius="full" boxSize="100px" objectFit="cover" />}
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
