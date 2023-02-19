import UserCard from '@src/organisms/user/UserCard'
import React from 'react'

const user = {
  name: "山田太郎",
  image: "",
  employeeId: "123456",
  email: "123456@gmail.com",
  area: "北部九州"
}

const Page = () => {
  return (
      <UserCard user={user}/>
  )
}
export default Page