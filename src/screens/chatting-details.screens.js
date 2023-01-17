import { SafeAreaView } from "react-native";
import React from "react";
import { Center, NativeBaseProvider, Text } from "native-base";

class ChattingDetails extends React.PureComponent {
  render() {
    return (
      <NativeBaseProvider>
        <SafeAreaView flex={1}>
          <Center flex={1}>
            <Text color={"red.800"}>Chatting Details</Text>
          </Center>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default ChattingDetails;
