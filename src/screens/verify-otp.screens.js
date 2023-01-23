import React, { Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { Navigation } from "react-native-navigation";

import {
  NativeBaseProvider,
  Box,
  Text,
  Badge,
  FormControl,
  Stack,
  Input,
  Button,
} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { withTranslation } from "react-i18next";

import VerifyOtp from "../components/verify-otp";

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

import { connect } from "react-redux";

import CommonConstants from "../modules/constants.common.js";
import ModalAppVersionForceUpdate from "../components/modal-app-version-force-update.js";

class VerifyOtpScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      login_changed: false,
    };

    this.backHandler = false;

    this.form = {
      otp: "",
      tnc: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      this._onClickedBack()
    );
  }

  componentDidAppear() {
    if (this.backHandler == false) {
      this.backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
        this._onClickedBack()
      );
    }
  }

  componentDidDisappear() {
    if (this.backHandler) {
      this.backHandler.remove();
      this.backHandler = false;
    }
  }

  render() {
    const statusBarCurrentHeight = getStatusBarHeight(true);
    const { registerForm, source, t, i18n } = this.props;
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

          <Box
            style={{
              paddingTop: 10,
              paddingLeft: COMMON_STYLE.PADDING,
              paddingRight: COMMON_STYLE.PADDING,
              height: height - 60,
            }}
          >
            <ScrollView>
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
                              this.form.otp = text;
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

                    <Box mx={8} rounded={"full"}>
                      <Button
                        block
                        onPress={this._onLogin}
                        style={COMMON_STYLES.LOGIN_BUTTON}
                      >
                        <Text color={"white"}>Sign in</Text>
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
            </ScrollView>
          </Box>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }

  _onLogin = () => {
    const { componentId } = this.props;
    console.log(componentId);
    Navigation.push(componentId, {
      component: {
        name: "navigation.panntheefoundation.createPassword",
        passProps: {
          screenComponentId: this.props.componentId,
        },
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

  _onClickedBack = () => {
    global.backHandlerClickCount = 1;
    Navigation.pop(this.props.componentId);
    return true;
  };

  _onClickedHome = () => {
    Navigation.popToRoot("home");
  };
}

function mapStateToProps(state) {
  return {
    login_changed: state.login_changed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // updateLoginChanged: (LOGGEDIN_USER) => dispatch({ type: 'LOGIN_CHANGED', payload: LOGGEDIN_USER }),
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(VerifyOtpScreen)
);
