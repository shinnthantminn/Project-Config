import { SafeAreaView } from "react-native";
import React from "react";
import { Center, NativeBaseProvider, Text, Button, VStack } from "native-base";
import { Navigation } from "react-native-navigation";

class chatting extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "navigation.panntheefoundation.innerChatting",
      },
    });
  };

  render() {
    return (
      <NativeBaseProvider>
        <SafeAreaView flex={1}>
          <Center flex={1}>
            <VStack>
              <Center>
                <Text>Chatting</Text>
                <Button onPress={this.handlePress}>
                  go to inner InnerChatting
                </Button>
              </Center>
            </VStack>
          </Center>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default chatting;
