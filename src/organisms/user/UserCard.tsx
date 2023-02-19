import { Avatar } from "@chakra-ui/react"
// import styled from "styled-components"
export const UserCard = () => {
  return (
    <div>
      <Avatar flexShrink={0} width={10} height={10} />
      <p>名前</p>
      <dl>
        <dt>社員番号</dt>
        <dd>200012</dd>
        <dt>メールアドレス</dt>
        <dd>123456@gmail.com</dd>
        <dt>エリア</dt>
        <dd>北部九州</dd>
      </dl>
    </div>
  )
}
export default UserCard
