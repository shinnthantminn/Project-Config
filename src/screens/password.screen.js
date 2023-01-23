import React, { Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  BackHandler,
  FlatList,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  faEye,
  faEyeSlash,
  faLock,
  faAngleRight,
  faPhone,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// import Gmail from "../assets/images/gmail.png";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import SpinnerOverlay from "react-native-loading-spinner-overlay";
import ModalAlert from "../components/modal-alert";

import { Navigation } from "react-native-navigation";

import {
  NativeBaseProvider,
  extendTheme,
  Box,
  HStack,
  Text,
  FormControl,
  Stack,
  Input,
  Button,
  Checkbox,
  Center,
  Square,
  Spacer,
  Flex,
} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { withTranslation } from "react-i18next";

import Register from "../components/register";

import COMMON_STYLES, {
  COLORS,
  FONTS,
  COMMON_STYLE,
} from "../modules/styles.common.js";
import _ from "lodash";
import { Grid, Row, Col } from "react-native-easy-grid";

import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
import ModalAppVersionForceUpdate from "../components/modal-app-version-force-update.js";

class PasswordScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      forceRender: false,
    };

    this.form = {
      phone: "",
      tnc: false,
    };
  }

  render() {
    const statusBarCurrentHeight = getStatusBarHeight(true);
    const { t, i18n } = this.props;
    const { width, height } = Dimensions.get("window");
    const logo_image = require("../assets/images/panthee-logo.png");

    return (
      <NativeBaseProvider>
        <SafeAreaView
          style={{
            flex: 0,
            backgroundColor: COLORS.WHITE,
            height: statusBarCurrentHeight,
          }}
        />
        <SafeAreaView
          style={
            (COMMON_STYLES.SAFE_AREA_SECTION,
            {
              flex: 1,
            })
          }
        >
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
          <ModalAppVersionForceUpdate />

          <NativeBaseProvider theme={this.theme}>
            <Box
              style={{
                paddingLeft: COMMON_STYLE.PADDING,
                paddingRight: COMMON_STYLE.PADDING,
                height: height < 680 ? 680 : height,
              }}
            >
              <Box
                style={{
                  height: 450,
                  justifyContent: "center",
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

                <FormControl
                  isRequired
                  style={{
                    height: 80,
                    marginBottom: 7,
                  }}
                >
                  <Stack>
                    <Box alignItems={"center"}>
                      <Input
                        p={Platform.OS === "ios" ? 4 : 3}
                        backgroundColor="gray.100"
                        width={280}
                        onChangeText={(text) => {
                          this.form.phone = text;
                        }}
                        placeholder="----------"
                        textAlign={"center"}
                        placeholderTextColor={COLORS.GRAY}
                        keyboardType={"decimal-pad"}
                        variant="rounded"
                        style={[
                          COMMON_STYLES[i18n.language],
                          {
                            fontSize: 13,
                            letterSpacing: 3,
                          },
                        ]}
                      />
                    </Box>
                  </Stack>
                </FormControl>

                <Box mx={10} rounded={"full"}>
                  <Button
                    block
                    onPress={this._onLogin}
                    style={COMMON_STYLES.LOGIN_BUTTON}
                  >
                    <Text color={"white"}>Log in</Text>
                  </Button>
                </Box>
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
                      COMMON_STYLES[i18n.language].regular,
                      {
                        textDecorationLine: "underline",
                        color: COLORS.BLACK,
                        textAlign: "center",
                        fontSize: 12,
                      },
                    ]}
                  >
                    {t("Terms of use | Private Policy")}
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </NativeBaseProvider>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default withTranslation()(PasswordScreen);
