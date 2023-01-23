import { Text, View, SafeAreaView, Dimensions, Platform } from "react-native";
import React, { PureComponent } from "react";

//NativeBase
import {
  Button,
  Box,
  Input,
  Center,
  NativeBaseProvider,
  HStack,
  FormControl,
  VStack,
  Flex,
  Container,
  ScrollView,
  Image,
  Stack,
} from "native-base";

// Constant Color
import COMMON_STYLES, {
  COLORS,
  FONTS,
  COMMON_STYLE,
} from "../modules/styles.common.js";

// datePicker
import DatePicker from "react-native-date-picker";

// Grid
import { Grid, Col, Row } from "react-native-easy-grid";

// Iphone Helper
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

// image
import user from "../assets/images/panthee-logo.png";

class UserinfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      con: false,
      date: new Date(),
    };
  }

  render() {
    const statusBarCurrentHeight = getStatusBarHeight(true);
    const { width, height } = Dimensions.get("window");

    return (
      <NativeBaseProvider>
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" && 100,
            flex: 1,
            height: statusBarCurrentHeight,
          }}
        >
          <Box
            style={{
              paddingLeft: COMMON_STYLE.PADDING,
              paddingRight: COMMON_STYLE.PADDING,
              height: height < 680 ? 680 : height,
            }}
          >
            {/* <Box mx={20}>
              <Input
                variant={"rounded"}
                backgroundColor="gray.100"
                placeholder={`${this.state.date
                  .getDay()
                  .toString()}/${this.state.date
                  .getMonth()
                  .toString()}/${this.state.date.getFullYear().toString()}`}
                onPressIn={() =>
                  this.setState({ ...this.state, con: !this.state.con })
                }
              />
            </Box> */}

            {/* this is date Picker */}
            <DatePicker
              modal
              mode="date"
              date={this.state.date}
              open={this.state.con}
              onConfirm={(d) => {
                console.log(d, "hello");
                this.setState({ date: d, con: !this.state.con });
              }}
              onCancel={() => {
                this.setState({ ...this.state, con: !this.state.con });
              }}
            />

            <HStack alignItems="center">
              <Box
                w={100}
                h={100}
                rounded="full"
                backgroundColor={"red.400"}
                mx={5}
              >
                <Image
                  rounded={"full"}
                  resizeMode="center"
                  source={user}
                  w={"full"}
                  h="full"
                  backgroundColor="amber.100"
                />
              </Box>
              <FormControl justifyContent={"center"}>
                <Stack mb={5}>
                  <Box>
                    <Input
                      w={200}
                      placeholder="Name"
                      variant={"rounded"}
                      borderWidth={0}
                      backgroundColor="gray.200"
                    />
                  </Box>
                </Stack>

                <Stack>
                  <Box>
                    <Input w={200} placeholder="Date Of Birth" />
                  </Box>
                </Stack>
              </FormControl>
            </HStack>
          </Box>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default UserinfoScreen;
