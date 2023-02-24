import { Avatar, Flex } from "@chakra-ui/react"

type Props = {
  image: string,
  name: string
}

export const UsericonWithName = (props: Props) => {
  const { image, name } = props

  return (
    <Flex alignItems="center" mb={2}>
      <Avatar name={name} src={image} size="lg" mr={4} />
    </Flex>
  )
}

export default UsericonWithName
