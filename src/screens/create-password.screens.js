import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { PureComponent } from "react";

// Native Base
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Input,
  NativeBaseProvider,
  Square,
  Stack,
} from "native-base";

// Constant Color
import COMMON_STYLES, {
  COLORS,
  FONTS,
  COMMON_STYLE,
} from "../modules/styles.common.js";

// components
import ModalAppVersionForceUpdate from "../components/modal-app-version-force-update.js";

// IOS
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

// FontAwesome
import {
  faEye,
  faEyeSlash,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

// Naviagtion
import { Navigation } from "react-native-navigation";

export class CreatePassword extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const statusBarCurrentHeight = getStatusBarHeight(true);
    const { t, i18n } = this.props;

    console.log(this.props, "Hello World");

    const logo_image = require("../assets/images/panthee-logo.png");
    const { width, height } = Dimensions.get("window");
    return (
      <NativeBaseProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.WHITE,
            height: statusBarCurrentHeight,
          }}
        >
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
          <ModalAppVersionForceUpdate />
          <Box
            style={{
              paddingLeft: COMMON_STYLE.PADDING,
              paddingRight: COMMON_STYLE.PADDING,
              height: height < 680 ? 680 : height,
            }}
          >
            <Box
              style={{
                marginBottom: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={logo_image}
                style={{
                  width: 160,
                  height: 160,
                  marginTop: 30,
                }}
              />
              <Text letterSpacing={3} fontSize={10}>
                Education
              </Text>
            </Box>

            <Box mx={10}>
              <FormControl>
                <FormControl.Label>
                  <Text
                    style={{
                      letterSpacing: 2,
                      fontSize: 13,
                      fontWeight: "bold",
                      color: COLORS.GRAY_20,
                    }}
                  >
                    Set Password
                  </Text>
                </FormControl.Label>
                <Stack>
                  <Box alignItems={"center"}>
                    <Input
                      // onChangeText={(text) => {
                      //   this.form.phone = text;
                      // }}
                      backgroundColor={"gray.100"}
                      type="password"
                      py={3}
                      InputRightElement={
                        <Box
                          h="full"
                          borderLeftWidth={1}
                          borderLeftColor="gray.300"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            size={15}
                            style={{
                              margin: Platform.OS === "android" ? 20 : 12,
                            }}
                          />
                        </Box>
                      }
                      placeholder="----------"
                      placeholderTextColor={COLORS.GRAY}
                      keyboardType={"decimal-pad"}
                      textAlign="right"
                      variant="rounded"
                      style={[
                        {
                          fontSize: 13,
                          letterSpacing: 5,
                        },
                      ]}
                    />
                  </Box>
                </Stack>

                <FormControl.Label mt={5}>
                  <Text
                    style={{
                      letterSpacing: 2,
                      fontSize: 13,
                      fontWeight: "bold",
                      color: COLORS.GRAY_20,
                    }}
                  >
                    Confirm Password
                  </Text>
                </FormControl.Label>
                <Stack>
                  <Box alignItems={"center"}>
                    <Input
                      // onChangeText={(text) => {
                      //   this.form.phone = text;
                      // }}
                      backgroundColor={"gray.100"}
                      type="password"
                      py={3}
                      InputRightElement={
                        <Box
                          h="full"
                          borderLeftWidth={1}
                          borderLeftColor="gray.300"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            size={15}
                            style={{
                              margin: Platform.OS === "android" ? 20 : 12,
                            }}
                          />
                        </Box>
                      }
                      placeholder="----------"
                      placeholderTextColor={COLORS.GRAY}
                      keyboardType={"decimal-pad"}
                      textAlign="right"
                      variant="rounded"
                      style={[
                        {
                          fontSize: 13,
                          letterSpacing: 5,
                        },
                      ]}
                    />
                  </Box>
                </Stack>
              </FormControl>

              <Center mt={7}>
                <Button
                  onPress={this._handleClick}
                  backgroundColor={COLORS.THEME}
                  rounded={100}
                >
                  <FontAwesomeIcon icon={faChevronRight} color={COLORS.WHITE} />
                </Button>
              </Center>
            </Box>

            <Box
              style={{
                height: 210,
                justifyContent: "flex-end",
                marginBottom: 30,
                marginTop: 30,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={[
                    // COMMON_STYLES[i18n.language].regular,
                    {
                      textDecorationLine: "underline",
                      color: COLORS.BLACK,
                      textAlign: "center",
                      fontSize: 12,
                    },
                  ]}
                >
                  Terms of use | Private Policy
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }

  _handleClick = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "navigation.panntheefoundation.UserInfoScreen",
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

export default CreatePassword;
