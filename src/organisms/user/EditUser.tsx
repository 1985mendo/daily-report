import { useState } from "react"
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react"
import type { User } from "@src/pages/profile"
import { useRouter } from "next/router"

export type EditUserProps = {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUser = ({ user, onSave, onCancel }: EditUserProps) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  console.log(setEmail)
  const [employeeId, setEmployeeId] = useState<string>(user.employeeId.toString())

  const [area, setArea] = useState(user.area)
  const [image] = useState<File | undefined>(undefined)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const updatedUser = { ...user, name, email, area }
    if (image) {
      const url = URL.createObjectURL(image)
      updatedUser.image = url
    }
    await onSave(updatedUser)
    router.push("/profile")
  }

  const handleEmployeeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmployeeId(value)
  }
  

  return (
    <Box maxWidth="sm" mx="auto">
      <Heading as="h2" size="lg" textAlign="center" my={8}>ユーザー情報編集</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>名前</FormLabel>
          <Input type="text" backgroundColor="white" value={name} onChange={(event) => setName(event.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Eメールアドレス</FormLabel>
          <Input value={user.email} isDisabled backgroundColor="gray.300" placeholder="メールアドレス" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>社員番号</FormLabel>
          <Input type="text" backgroundColor="white" value={employeeId} onChange={handleEmployeeIdChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>地域</FormLabel>
          <Textarea backgroundColor="white" value={area} onChange={(event) => setArea(event.target.value)} />
        </FormControl>
        <Button type="submit" mt={8} mx="auto" display="block" colorScheme="teal" size="lg" width="100%">
          保存
        </Button>
        <Button type="button" mt={4} mx="auto" display="block" onClick={onCancel}>
          キャンセル
        </Button>
      </form>
    </Box>
  )
}

export default EditUser
