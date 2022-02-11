import React, { useEffect, FC } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image, GradientBackground } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

import { useQuery } from "urql"

const ourQuery = `
  query MyQuery {
    user(where: {id: {_eq: "1c946af5-e242-4dc8-ba46-500c2fffbf35"}}) {
      id
      name
      fasts {
        id
        start_time
        end_time
      }
    }
  }
`

export const DemoListScreen: FC<StackScreenProps<NavigatorParamList, "demoList">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { characterStore } = useStores()
    const { characters } = characterStore

    const [result, reexecuteQuery] = useQuery({
      query: ourQuery,
    })

    if (result.fetching) return null

    const user = result.data.user[0]

    console.tron.logImportant(user)

    return (
      <View testID="DemoListScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="demoListScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...user.fasts]}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Text style={LIST_TEXT}>
                  {item.start_time} - {item.end_time}
                </Text>
              </View>
            )}
          />
        </Screen>
      </View>
    )
  },
)
