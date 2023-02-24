import { Avatar } from "@chakra-ui/react"

export const UsericonWithName = (props: any) => {
  const { name, avatarUrl } = props
  return (
    <div>
      <Avatar size="xl" name={name} src={avatarUrl} />
    </div>
  )
}
