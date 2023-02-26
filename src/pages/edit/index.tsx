import EditUser, { EditUserProps } from "@src/organisms/user/EditUser"
import { Flex } from "@chakra-ui/react"

const Page = () => {
  const props: EditUserProps = {
    user: {
      name: "山田太郎",
      image: "",
      employeeId: "123456",
      email: "123456@gmail.com",
      area: "北部九州"
    },
    onSave: () => console.log("saved"),
    onCancel: () => console.log("canceled"),
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" backgroundColor="#e4f9f5">
      <EditUser {...props} />
    </Flex>
  )
}

export default Page
