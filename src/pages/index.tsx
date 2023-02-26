import type { NextPage } from 'next'
import { Heading, Text } from '@chakra-ui/react'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'

const Page: NextPage = () => {
  return (
    <AuthGuard>
      <Heading>Daily-Report-App</Heading>
      <Text>コンセプト: 日報作成支援ツール</Text>
      <Text>ターゲット: 外回り営業マン、移動が多い職種向け</Text>
      <Text>利用の流れ: サインイン→出発地点にて地図ボタン押下→日報作成時、訪問場所、経路を記録できる→一定時間同一場所に留まると警告が表示される（2分間）
      </Text>
      <Text>制作期間: １ヶ月</Text>
      <Text>今後の課題: 地点のデータ保持機能、地図へのコメント記入機能をつけ本体のみで日報作成ができるように</Text>
    </AuthGuard>
  )
}

export default Page