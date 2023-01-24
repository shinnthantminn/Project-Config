import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
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
  Radio,
  Spacer,
  Select,
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

// Navigation
import { Navigation } from "react-native-navigation";

class UserinfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      con: false,
      date: new Date(),
      radio: "male",
      state: "",
    };
  }

  data = [
    { id: 1, name: "yangon" },
    { id: 2, name: "oknasa" },
  ];

  render() {
    const statusBarCurrentHeight = getStatusBarHeight(true);
    const { width, height } = Dimensions.get("window");
    const { t, i18n } = this.props;

    console.log(t, i18n);

    return (
      <NativeBaseProvider>
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" && 50,
            flex: 1,
            height: statusBarCurrentHeight,
          }}
        >
          <ScrollView alwaysBounceHorizontal={false}>
            <Box
              mx={5}
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

              {/* name and form */}

              <HStack alignItems="center">
                <Box
                  w={100}
                  h={100}
                  mr={5}
                  rounded="full"
                  style={{ borderRadius: 10 }}
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
                    <Box my={2}>
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
                      <Input
                        w={200}
                        placeholder="Date Of Birth"
                        rounded={"full"}
                        backgroundColor="gray.200"
                      />
                    </Box>
                  </Stack>
                </FormControl>
              </HStack>

              {/* checkbox */}

              <HStack my={10}>
                <FormControl>
                  <HStack justifyContent={"space-between"}>
                    <FormControl.Label>Gender</FormControl.Label>
                    <Radio.Group
                      flexDirection={"row"}
                      name="myRadioGroup"
                      accessibilityLabel="favorite number"
                      value={this.state.radio}
                      onChange={(value) =>
                        this.setState({ ...this.state, radio: value })
                      }
                    >
                      <Radio colorScheme={"green"} value={"male"}>
                        Male
                      </Radio>
                      <Box ml={5} />
                      <Radio colorScheme={"green"} value={"female"}>
                        Male
                      </Radio>
                    </Radio.Group>
                  </HStack>
                </FormControl>
              </HStack>

              {/* Form */}

              <FormControl>
                <Box my={2}>
                  <FormControl.Label>Select Division / State</FormControl.Label>
                  <Select
                    variant="rounded"
                    backgroundColor={"gray.200"}
                    selectedValue={this.state.state}
                  >
                    {this.data.map((el, index) => (
                      <Select.Item
                        label={el.name}
                        value={el.name}
                        key={index}
                      />
                    ))}
                  </Select>
                </Box>
                <Box my={2}>
                  <FormControl.Label>Select City</FormControl.Label>
                  <Select
                    backgroundColor={"gray.200"}
                    variant="rounded"
                    selectedValue={this.state.state}
                  >
                    {this.data.map((el, index) => (
                      <Select.Item
                        label={el.name}
                        value={el.name}
                        key={index}
                      />
                    ))}
                  </Select>
                </Box>
                <Box my={2}>
                  <FormControl.Label>Email Address</FormControl.Label>
                  <Input
                    backgroundColor={"gray.200"}
                    placeholder="example@google.com"
                    variant={"rounded"}
                  />
                </Box>
                <Box my={2}>
                  <FormControl.Label>User Type</FormControl.Label>
                  <Select
                    backgroundColor={"gray.200"}
                    variant="rounded"
                    selectedValue={this.state.state}
                  >
                    {this.data.map((el, index) => (
                      <Select.Item
                        label={el.name}
                        value={el.name}
                        key={index}
                      />
                    ))}
                  </Select>
                </Box>
              </FormControl>

              {/* Singn In Button */}
              <Box mx={5} mt={10}>
                <Button
                  onPress={this._handleSignIn}
                  backgroundColor={COLORS.THEME}
                  rounded={"full"}
                >
                  Sign in
                </Button>
              </Box>

              {/* Term */}
              <Box mt={20}>
                <TouchableOpacity>
                  <Text style={{ textAlign: "center" }}>
                    By Signing in ,I'm agree
                  </Text>
                  <Text
                    style={[
                      {
                        textDecorationLine: "underline",
                        color: COLORS.BLACK,
                        textAlign: "center",
                        fontSize: 12,
                      },
                    ]}
                  >
                    "Terms of use | Private Policy"
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </ScrollView>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
  _handleSignIn = () => {
    console.log("Hello World");
    Navigation.push(this.props.componentId, {
      component: {
        name: "navigation.panntheefoundation.HomeScreen",
        // passProps: {
        //   source: "login_with_otp",
        //   registerForm: form,
        // },
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
          topBar: {
            height: 0,
            visible: false,
          },
        },
      },
    });
  };
}

export default UserinfoScreen;
